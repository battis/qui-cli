import { Positionals } from '@qui-cli/core';
import { PathString } from '@battis/descriptive-types';
import * as Plugin from '@qui-cli/plugin';
import * as FileHandlers from './FileHandlers/index.js';
import path from 'node:path';
import * as Confirm from './Confirm/index.js';
import fs from 'node:fs';
import { Log } from '@qui-cli/log';

export type Configuration = Plugin.Configuration & {
  dirPath?: PathString;

  /** Directory of `packageName` to search for configuration templates */
  template?: PathString;

  /**
   * Define custom file handling behavior (`package.json` and
   * `pnpm-workspace.yaml` are merged together rather than replaced by default)
   */
  fileHandlers?: Record<string, FileHandlers.FileHandler>;

  /** File names or patterns to ignore in `template` (`'.DS_Store'` by default) */
  ignore?: (string | RegExp)[];

  /** Run without confirmation, accepting proposed changes automatically */
  force?: boolean;
};

export const config: Configuration = {
  enclosingDirectory: true,
  template: 'template',
  delimiter: ',',
  fileHandlers: {
    'package.json': FileHandlers.NPMPackage,
    'pnpm-workspace.yaml': FileHandlers.PNPMWorkspace
  },
  ignore: ['.DS_Store'],
  force: false
};

Positionals.require({
  dirPath: {
    description: 'Path to directory to be initialized'
  }
});
Positionals.allowOnlyNamedArgs();
Positionals.requireAtLeast(0);

export const name = 'init';

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      switch (key) {
        case 'fileHandlers':
          config.fileHandlers = {
            ...config.fileHandlers,
            ...proposal.fileHandlers
          };
          break;
        case 'ignore':
          if (proposal.ignore?.length !== 0) {
            config.ignore = [
              ...new Set([...(config.ignore || []), ...(proposal.ignore || [])])
            ];
            break;
          }
        // eslint-disable-next-line no-fallthrough
        default:
          config[key] = proposal[key];
      }
    }
  }
}

export function options() {
  return {
    man: [{ level: 1, text: 'Init Options' }],
    optList: {
      ignore: {
        description: 'Exact file names to ignore in template',
        default: config.ignore?.filter((i) => typeof i === 'string')
      },
      ignoreRegexp: {
        description: 'Regular expressions to ignore in templates',
        hint: '/^\\.env(\\.*)?$/i',
        default: config.ignore
          ?.filter((i) => typeof i !== 'string')
          .map((r) => `${r}`)
      }
    },
    flag: {
      force: {
        description: `Force initialization, overwriting files without confirmation`,
        short: 'f',
        default: config.force
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  const dirPath = Positionals.get('dirPath');
  const { ignore = [], ignoreRegexp = [], ...rest } = values;
  configure({
    dirPath,
    ignore: [
      ...ignore,
      ...ignoreRegexp.map((ignore) => {
        const [, regexp = '.*', flags] =
          ignore.match(/^\/(.*)\/([a-z]*)$/) || [];
        return new RegExp(regexp, flags);
      })
    ],
    ...rest
  });
  FileHandlers.NPMPackage.configure({
    packagePath: path.join(dirPath || process.cwd(), 'package.json')
  });
}

export async function run() {
  if (!config.template) {
    throw new Error(`A template source must be provided`);
  }

  let destPath = process.cwd();
  if (config.dirPath) {
    destPath = path.resolve(destPath, config.dirPath);
    fs.mkdirSync(destPath, { recursive: true });
  }
  const warnings = await Confirm.mergeDirectory({
    srcPath: config.template,
    destPath,
    ...config
  });
  if (warnings.length) {
    warnings.map((warning) => Log.warning(warning));
  }

  return true;
}
