import { Colors } from '@qui-cli/colors';
import { Core } from '@qui-cli/core';
import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import fs from 'node:fs';
import path from 'node:path';
import stripAnsi from 'strip-ansi';

export type Configuration = Plugin.Configuration & {
  /**
   * Path to which to write Markdown output file. If the path does not exist, it
   * will be created. If the path does not have a file extension, it will be
   * assumed to be a directory path (unless it exists as a file), see
   * [`fileName`](#fileName).
   */
  outputPath?: string;
  /**
   * Filename to use for output if `outputPath` is a path to a directory.
   * Default: `"usage.md"`.
   */
  fileName?: string;
  /** Any Markdown text to prepend to the output. */
  pre?: string;
  /** Amount to increment (or decrement) heading levels in the Markdown output. */
  headingLevelAdjustment?: number;
  /** Any Markdown text to append to the output. */
  post?: string;
  /** Whether or not to overwrite an existing file with output. Default: `false` */
  overwrite?: boolean;
};

export const name = 'markdown';

let outputPath = '.';
let fileName = 'usage.md';
let pre = '';
let headingLevelAdjustment = 0;
let post = '';
let overwrite = false;

export function configure(config: Configuration = {}) {
  outputPath = Plugin.hydrate(config.outputPath, outputPath);
  fileName = Plugin.hydrate(config.fileName, fileName);
  pre = Plugin.hydrate(config.pre, pre);
  headingLevelAdjustment = Plugin.hydrate(
    config.headingLevelAdjustment,
    headingLevelAdjustment
  );
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
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  fs.writeFileSync(
    outputPath,
    `${pre.length ? `${pre}\n` : ''}${adjustHeadingLevel(
      stripAnsi(Core.usageMarkdown())
    )
      .replace('Usage:\n\n```', '## Usage:\n\n```bash')
      .replace(
        '#### `-h --help',
        '## Arguments\n\n#### `-h --help'
      )}${post.length ? `\n${post}` : ''}`
  );
}

function adjustHeadingLevel(usage: string) {
  return usage
    .split('\n')
    .map((line) => {
      const [, heading] = line.match(/^(#+) /) || [];
      if (heading) {
        return line.replace(
          /^(#+)/,
          '#'.repeat(heading.length + headingLevelAdjustment)
        );
      }
      return line;
    })
    .join('\n');
}
