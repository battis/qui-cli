import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import { merge } from '../JSON/index.js';
import * as Confirm from '../Confirm/index.js';
import { FileHandler } from './FileHandler.js';
import path from 'node:path';
import { IPackageJson } from 'package-json-type';
import * as Placeholders from '../../Placeholders.js';
import * as Plugin from '@qui-cli/plugin';
import prettier from 'prettier';
import { PathString } from '@battis/descriptive-types';
import { Log } from '@qui-cli/log';
import { kebabCase } from 'change-case';

export type Configuration = Plugin.Configuration & {
  packagePath?: PathString;
  /** Name (without scope) for the project being initialized */
  name?: string;
  /** Scope for the project being initialized */
  scope?: string;
  description?: string;
  private?: boolean;
};

const config: Configuration = {
  private: false
};

export function configure(proposal: Configuration = {}) {
  // process command line options
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }

  // try to read unset package name and scope from local package.json
  if (
    config.packagePath &&
    !config.name &&
    fs.existsSync(path.resolve(process.cwd(), config.packagePath))
  ) {
    const pkg: IPackageJson = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), config.packagePath), 'utf8')
    );
    const [, , scope, name] = pkg.name?.match(/^(@([^/]+)\/)?(.+)$/) || [];
    config.scope = scope || config.scope;
    config.name = name || config.name;
  }

  // infer unset package name from path to not-yet-created package.json
  if (!config.name && config.packagePath) {
    config.name = path.basename(path.dirname(config.packagePath));
  }

  const placeholders: Placeholders.Configuration['placeholders'] = {
    description: [config.description || '']
  };
  if (config.scope) {
    placeholders.scope = [config.scope];
  }
  if (config.name) {
    placeholders.name = [
      config.name,
      `${config.scope ? `@${kebabCase(config.scope)}/` : ''}${kebabCase(config.name)}`,
      `${config.scope ? `@${kebabCase(config.scope)}%2f` : ''}${kebabCase(config.name)}`
    ];
  }
  Placeholders.configure({ placeholders });
}

export function options() {
  return {
    man: [{ level: 1, text: 'npm Package Options' }],
    opt: {
      scope: {
        description: 'Scope of package to be created',
        hint: Colors.quotedValue(`"example"`),
        default: config.scope
      },
      description: {
        description: 'Description of package',
        default: config.description
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export const handle: FileHandler['handle'] = async ({
  srcPath,
  destPath,
  force = false
}) => {
  const proposal = JSON.parse(
    Placeholders.replaceAll(fs.readFileSync(srcPath, 'utf8'))
  );
  if (config.private) {
    proposal.private = true;
  }
  if (fs.existsSync(destPath)) {
    const pkg: IPackageJson = JSON.parse(fs.readFileSync(destPath, 'utf8'));
    let changed = false;
    for (const key in proposal) {
      const update = merge(proposal[key], pkg[key]);
      await Confirm.withDiff({
        src: update,
        dest: pkg[key],
        identifier: Colors.value(`package.${key}`),
        action: () => {
          pkg[key] = update;
          changed = true;
        },
        force
      });
    }
    if (changed) {
      fs.writeFileSync(
        destPath,
        await prettier.format(JSON.stringify(pkg), {
          ...(await prettier.resolveConfig(import.meta.dirname)),
          filepath: destPath
        })
      );
      Log.info(`${Colors.path(destPath, Colors.keyword)} updated`);
      return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'package.json'), Colors.keyword)}, please verify package dependency and build status`;
    } else {
      Log.info(`${Colors.path(destPath, Colors.keyword)} up-to-date`);
    }
  } else {
    fs.writeFileSync(
      destPath,
      await prettier.format(JSON.stringify(proposal), {
        ...(await prettier.resolveConfig(import.meta.dirname)),
        filepath: destPath
      })
    );
    Log.info(`${Colors.path(destPath, Colors.keyword)} created`);
    return `A new ${Colors.path(path.join(process.cwd(), 'package.json'), Colors.keyword)} has been created, please install dependencies`;
  }
};

await Plugin.register({ name: 'init.npm-package', configure, options, init });
