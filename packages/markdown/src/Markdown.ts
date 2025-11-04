import { Colors } from '@qui-cli/colors';
import { Core } from '@qui-cli/core';
import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import fs from 'node:fs';
import path from 'node:path';
import stripAnsi from 'strip-ansi';

export type Configuration = Plugin.Configuration & {
  outputPath?: string;
  fileName?: string;
  pre?: string;
  post?: string;
  overwrite?: boolean;
};

export const name = 'markdown';

let outputPath = '.';
let fileName = 'usage.md';
let pre = '';
let post = '';
let overwrite = false;

export function configure(config: Configuration = {}) {
  outputPath = Plugin.hydrate(config.outputPath, outputPath);
  fileName = Plugin.hydrate(config.fileName, fileName);
  pre = Plugin.hydrate(config.pre, pre);
  post = Plugin.hydrate(config.post, post);
  overwrite = Plugin.hydrate(config.overwrite, overwrite);
}

export async function run() {
  outputPath = path.resolve(Root.path(), outputPath);
  if (fs.existsSync(outputPath)) {
    if (fs.statSync(outputPath).isFile()) {
      if (!overwrite) {
        throw new Error(
          `File ${Colors.url(outputPath)} already exists and will not be overwritten`
        );
      }
    } else {
      outputPath = path.join(outputPath, fileName);
    }
  } else {
    if (path.extname(outputPath) === '') {
      outputPath = path.join(outputPath, fileName);
    }
    fs.mkdirSync(path.basename(outputPath), { recursive: true });
  }
  fs.writeFileSync(
    outputPath,
    `${pre.length ? `${pre}\n` : ''}${stripAnsi(Core.usageMarkdown())
      .replace('Usage:\n\n```', '## Usage:\n\n```bash')
      .replace(
        '## `-h --help',
        '## Arguments\n\n#### `-h --help'
      )}${post.length ? `\n${post}` : ''}`
  );
}
