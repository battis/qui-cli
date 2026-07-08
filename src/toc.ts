import * as Plugin from '@qui-cli/plugin';
import { Core, Positionals } from '@qui-cli/core';
import fs from 'node:fs';
import path from 'node:path';
import { PathString } from '@battis/descriptive-types';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import { IPackageJson } from 'package-json-type';
import * as Confirm from '@qui-cli/init/dist/Init/Confirm/index.js';
import prettier from 'prettier';

type Configuration = Plugin.Configuration & {
  scanPath?: PathString;
  outputPath?: PathString;
  overwrite?: boolean;
  recursive?: boolean;
  depth?: number;
  heading?: number;
  templatePath?: PathString;
};

type Entry = {
  name: string;
  description: string;
  readme: PathString;
  subentries?: Entry[];
};

Positionals.require({
  scanPath: { description: 'Path to a directory to scan for packages' }
});
Positionals.allowOnlyNamedArgs();

const config: Configuration = {
  overwrite: false,
  recursive: false,
  heading: 3
};

function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

function options() {
  return {
    man: [{ level: 1, text: 'TOC Options' }],
    opt: {
      outputPath: {
        description: `Path to TOC output file (defaults to ${Colors.path(`${Colors.positionalArg('scanPath')}/README.md`)})`,
        short: 'o',
        default: config.outputPath
      },
      templatePath: {
        description: `Path to template into which to insert TOC at ${Colors.value(`{{TOC}}`)}`,
        default: config.templatePath
      }
    },
    flag: {
      overwrite: {
        description: 'Overwrite any existing TOC if present',
        short: 'O',
        default: config.overwrite
      },
      recursive: {
        description: `Whether or not to recursively traverse ${Colors.positionalArg('scanPath')}`,
        short: 'r',
        default: config.recursive
      }
    },
    num: {
      depth: {
        description: `If making at ${Colors.flagArg('--recursive')} scan, the maximum depth to scan`,
        short: 'd',
        default: config.depth
      },
      heading: {
        desription: `Base (largest) heading level in the TOC`,
        default: config.heading
      }
    }
  };
}

function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure({ scanPath: Positionals.get('scanPath'), ...values });
}

function heading(level: number) {
  level = Math.min(Math.max(1, level), 6);
  return new Array(level).fill('#').join('');
}

async function run() {
  if (!config.scanPath) {
    Log.error(`${Colors.positionalArg('scanPath')} must be defined`);
    process.exit(1);
  }

  config.scanPath = path.resolve(process.cwd(), config.scanPath);
  if (!config.outputPath) {
    config.outputPath = path.join(config.scanPath, 'README.md');
  } else {
    config.outputPath = path.resolve(process.cwd(), config.outputPath);
  }
  const outputPath = config.outputPath;

  const entries = scan(config.scanPath);
  if (entries) {
    let toc = `${heading(config.heading ? config.heading - 1 : 2)} ${path.basename(config.scanPath)}\n\n${render(entries).join('\n')}`;
    if (config.templatePath) {
      config.templatePath = path.resolve(process.cwd(), config.templatePath);
      if (fs.existsSync(config.templatePath)) {
        toc = await prettier.format(
          fs.readFileSync(config.templatePath, 'utf8').replace('{{TOC}}', toc),
          {
            ...(await prettier.resolveConfig(config.outputPath)),
            filepath: config.outputPath
          }
        );
      }
    }
    await Confirm.withDiff({
      src: toc,
      dest: fs.existsSync(config.outputPath)
        ? fs.readFileSync(outputPath, 'utf8')
        : undefined,
      identifier: Colors.path(outputPath, Colors.keyword),
      action: () => fs.writeFileSync(outputPath, toc),
      force: config.overwrite
    });
  } else {
    Log.error(
      `No indexable packages and README files found in ${Colors.path(config.scanPath)}`
    );
    process.exit(3);
  }
}

function scan(scanPath: PathString, depth = 0) {
  const toc: Entry[] = [];
  for (const filename of fs.readdirSync(scanPath)) {
    const entryPath = path.join(scanPath, filename);
    if (
      !['.', '..', 'node_modules'].includes(filename) &&
      fs.statSync(entryPath).isDirectory()
    ) {
      const packagePath = path.join(entryPath, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg: IPackageJson = JSON.parse(
          fs.readFileSync(packagePath, 'utf8')
        );
        const readme = path.join(entryPath, 'README.md');
        if (pkg.name && pkg.description && fs.existsSync(readme)) {
          toc.push({
            name: pkg.name,
            description: pkg.description,
            readme,
            subentries:
              config.recursive &&
              (config.depth === undefined || depth < config.depth)
                ? scan(entryPath, depth + 1)
                : undefined
          });
        }
      }
    }
  }
  if (toc.length) {
    return toc;
  }
  return undefined;
}

function render(entries: Entry[], depth = 0) {
  const lines: string[] = [];
  for (const entry of entries) {
    lines.push(
      ...`${heading((config.heading ? config.heading : 3) + depth)} [${entry.name}](./${encodeURI(
        path.relative(
          config.scanPath || config.scanPath || process.cwd(),
          entry.readme
        )
      )})\n\n${entry.description}
`
        .split('\n')
        .map(
          (line) =>
            `${new Array(depth).fill('>').join('')}${depth > 1 ? ' ' : ''}${line}`
        )
    );
    if (entry.subentries) {
      lines.push(...render(entry.subentries, depth + 1));
    }
  }
  if (entries.length) {
    return lines;
  }
  return [];
}

await Plugin.register({ name: 'toc', configure, options, init, run });
await Core.run();
