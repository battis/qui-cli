import * as Plugin from '@qui-cli/plugin';
import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import path from 'node:path';
import { Log } from '@qui-cli/log';
import type { IPackageJson } from 'package-json-type';
import { Configuration } from './Configuration.js';
import * as FileHandlers from './FileHandlers/index.js';
import * as confirm from './confirm/index.js';

export const name = '@battis/pkg-setup';
export const config: Configuration = {
  setupDir: 'pkg-setup',
  fileHandlers: {
    'package.json': FileHandlers.NPMPackage,
    'pnpm-workspace.yaml': FileHandlers.PNPMWorkspace
  },
  ignore: ['.DS_Store'],
  force: false
};

export function getConfiguration() {
  return config;
}

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
        default:
          config[key] = proposal[key];
      }
    }
  }
}

export function options(): Plugin.Options {
  return {
    man: [{ level: 1, text: `Setup Options` }],
    opt: {
      packageName: {
        description: 'Package name',
        short: 'p',
        default: config.packageName
      },
      setupDir: {
        description: 'Name of the setup template directory in the package',
        short: 'd',
        default: config.setupDir
      }
    },
    flag: {
      force: {
        description: `Force configuration, overwritting existing ${Colors.path(path.join(process.cwd(), '.prettierrc.json'), Colors.keyword)} without confirmation`,
        short: 'f',
        default: config.force
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export async function run() {
  if (!config.packageName) {
    Log.error(`${Colors.optionArg('--packageName')} must be defined`);
    process.exit(1);
  }

  if (!config.setupDir) {
    Log.error(`${Colors.optionArg('--setupDir')} must be defined`);
    process.exit(2);
  }

  const destPackagePath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(destPackagePath)) {
    Log.error(
      `${Colors.command(process.argv[1])} can only be run at a package root`
    );
    process.exit(3);
  }

  let pkg: IPackageJson;
  try {
    pkg = JSON.parse(fs.readFileSync(destPackagePath, 'utf8'));
  } catch (_) {
    Log.error(
      `${Colors.path(destPackagePath, Colors.keyword)} could not be parsed`
    );
    process.exit(4);
  }

  if (!(
    (pkg.dependencies && config.packageName in pkg.dependencies) ||
    (pkg.devDependencies && config.packageName in pkg.devDependencies) ||
    (pkg.peerDependencies && config.packageName in pkg.peerDependencies)
  )) {
    Log.error(
      `${Colors.value(config.packageName)} must be a dependency of the local package`
    );
    process.exit(5);
  }

  const srcPath = path.join(
    process.cwd(),
    'node_modules',
    config.packageName,
    config.setupDir
  );

  if (!fs.existsSync(srcPath)) {
    Log.error(
      `Could not find source directory ${Colors.path(srcPath, Colors.keyword)}`
    );
    process.exit(6);
  }

  const warnings: string[] = [];
  for (const filename of fs.readdirSync(srcPath)) {
    const normalizedFilename = filename.replace(/^dot\./, '.');
    if (config.fileHandlers && normalizedFilename in config.fileHandlers) {
      const warning = await config.fileHandlers[normalizedFilename]({
        srcPath: path.join(srcPath, filename),
        destPath: path.join(process.cwd(), normalizedFilename),
        config,
        pkg
      });
      if (warning) {
        warnings.push(warning);
      }
    } else {
      if (
        ![
          '.',
          '..',
          ...(config.ignore?.filter((i) => typeof i === 'string') || [])
        ].includes(filename) &&
        !(config.ignore || []).reduce(
          (ignore, item) =>
            ignore || (typeof item !== 'string' && item.test(filename)),
          false
        )
      ) {
        await confirm.copy(
          path.join(srcPath, filename),
          path.join(process.cwd(), normalizedFilename)
        );
      }
    }
  }

  if (warnings.length) {
    warnings.map((warning) => Log.warning(warning));
  }

  return true;
}
