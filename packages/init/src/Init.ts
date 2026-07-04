import { Colors } from '@qui-cli/colors';
import * as Plugin from '@qui-cli/plugin';
import path from 'node:path';
import fs from 'node:fs';
import ora from 'ora';
import type { IPackageJson } from 'package-json-type';
import { Positionals } from '@qui-cli/core';
import input from '@inquirer/input';
import type { PathString } from '@battis/descriptive-types';
import { pascalCase, kebabCase } from 'change-case';
import { Log } from '@qui-cli/log';

export type Configuration = Plugin.Configuration & {
  name?: string;
  scope?: string;
  template?: PathString;
};

Positionals.require({
  name: {
    description: 'Package name (without scope)'
  }
});
Positionals.allowOnlyNamedArgs();

export const name = 'npm-init';
const config: Configuration = {};

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      switch (key) {
        case 'scope':
          proposal[key] = proposal[key].replace(/^@/, '');
          break;
      }
      config[key] = proposal[key];
    }
  }
}

export function options() {
  return {
    man: [{ level: 1, text: 'Create Command Options' }],
    opt: {
      scope: {
        description: 'Scope of package to be created',
        hint: Colors.quotedValue(`"example"`)
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure({ name: Positionals.get('name'), ...values });
}

export async function run() {
  const projectDirPath = await copyTemplate();
  Log.info(
    `${Colors.value(
      `${config.scope ? `@${config.scope}/` : ''}${config.name}`
    )} project created in ${Colors.path(projectDirPath)}.\n\n` +
      `Run your preferred package manager install to install dependencies.`
  );
}

async function copyTemplate() {
  if (!config.name) {
    throw Error();
  }
  if (!config.template) {
    throw Error();
  }
  const destDirPath = path.resolve(process.cwd(), config.name);
  fs.mkdirSync(destDirPath);
  for (const filename of fs.readdirSync(config.template)) {
    const srcFilePath = path.join(config.template, filename);
    const destFilePath = path.join(destDirPath, filename);
    const spinner = ora(filename).start();
    try {
      fs.cpSync(srcFilePath, destFilePath, {
        recursive: true
      });
    } catch (error) {
      spinner.fail(`${filename}: ${error}`);
    }
    switch (filename) {
      case 'bin':
        fs.renameSync(
          path.join(destFilePath, '$command'),
          path.join(destFilePath, config.name)
        );
        spinner.succeed(`bin/${config.name}`);
        break;
      case 'package.json':
        spinner.stop();
        fs.writeFileSync(
          destFilePath,
          JSON.stringify(
            await preparePackage(
              JSON.parse(fs.readFileSync(srcFilePath, 'utf8'))
            ),
            null,
            2
          )
        );
        spinner.succeed(filename);
        break;
      case 'src':
        await prepareSrc(destFilePath);
        spinner.succeed();
        break;
      default:
        if (spinner.isSpinning) {
          spinner.succeed();
        }
    }
  }
  return destDirPath;
}

function applyName(text: string) {
  if (!config.name) {
    throw Error();
  }
  const name = config.name;
  return text
    .replaceAll('$name', kebabCase(name))
    .replaceAll('$Name', pascalCase(name))
    .replaceAll(
      '$NAME',
      `${config.scope ? `@${config.scope}/` : ''}${kebabCase(config.name)}`
    );
}

async function preparePackage(pkg: IPackageJson) {
  if (!config.name) {
    throw Error();
  }
  const name = applyName('$NAME');
  const description = await input({ message: 'Command description?' });
  const license = await input({ message: 'License?', default: 'GPL-3.0' });
  return {
    name,
    description: description.length ? description : undefined,
    license: license.length ? license : undefined,
    ...pkg
  };
}

async function prepareSrc(srcPath: PathString) {
  const moduleName = '$Name.ts';
  const indexPath = path.join(srcPath, 'index.ts');
  fs.writeFileSync(
    path.join(srcPath, applyName(moduleName)),
    applyName(fs.readFileSync(path.join(srcPath, moduleName), 'utf8'))
  );
  fs.writeFileSync(indexPath, applyName(fs.readFileSync(indexPath, 'utf8')));
}
