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
import { kebabCase } from 'change-case';

export type Configuration = Plugin.Configuration & {
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
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
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
  if (config.name) {
    Placeholders.configure({
      placeholders: {
        name: [
          config.name,
          config.scope
            ? `@${kebabCase(config.scope)}/${kebabCase(config.name)}`
            : kebabCase(config.name)
        ]
      }
    });
  }
}

export const handle: FileHandler['handle'] = async ({
  srcPath,
  destPath,
  force = false
}) => {
  const pkg: IPackageJson = fs.existsSync(destPath)
    ? JSON.parse(fs.readFileSync(destPath, 'utf8'))
    : {};
  const proposal = JSON.parse(
    Placeholders.replaceAll(fs.readFileSync(srcPath, 'utf8'))
  );
  if (config.private) {
    proposal.private = true;
  }
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
    return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'package.json'), Colors.keyword)}, please verify package dependency and build status`;
  }
};

await Plugin.register({ name: 'init.npm-package', configure, options, init });
