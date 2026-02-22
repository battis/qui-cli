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

  /** Style configuration options */
  style?: Partial<Record<keyof typeof Colors, [string, string]>>;
};

export const name = 'markdown';

const config: Configuration & {
  outputPath: string;
  fileName: string;
  pre: string;
  post: string;
  headingLevelAdjustment: number;
  style: NonNullable<Configuration['style']>;
} = {
  outputPath: '.',
  fileName: 'usage.md',
  pre: '',
  headingLevelAdjustment: 0,
  post: '',
  overwrite: false,
  style: {
    value: ['`', '`'],
    keyword: ['*', '*']
  }
};
const placeholder = '@';

export function restyle(text: string) {
  for (const key of Object.keys(Colors) as (keyof typeof Colors)[]) {
    const replacement = config.style[key] || config.style.value;
    if (replacement) {
      const [ansiOpen, ansiClose] = Colors[key](placeholder).split(placeholder);
      const [markdownOpen, markdownClose] = replacement;
      let start;
      while ((start = text.indexOf(ansiOpen)) >= 0) {
        const end = text.indexOf(ansiClose, start);
        text =
          text.slice(0, start) +
          markdownOpen +
          text.slice(start + ansiOpen.length, end) +
          markdownClose +
          text.slice(end + ansiClose.length);
      }
    }
  }
  return text;
}

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      switch (key) {
        case 'style':
          for (const k of Object.keys(
            proposal.style || {}
          ) as (keyof Configuration['style'])[]) {
            if (proposal.style && proposal.style[k] !== undefined) {
              config.style[k] = proposal.style[k];
            }
          }
          break;
        default:
          config[key] = proposal[key];
      }
    }
  }
}

export async function run() {
  config.outputPath = path.resolve(Root.path(), config.outputPath);
  if (fs.existsSync(config.outputPath)) {
    if (fs.statSync(config.outputPath).isFile()) {
      if (!config.overwrite) {
        throw new Error(
          `File ${Colors.path(config.outputPath)} already exists and will not be overwritten`
        );
      }
    } else {
      config.outputPath = path.join(config.outputPath, config.fileName);
    }
  } else {
    if (path.extname(config.outputPath) === '') {
      config.outputPath = path.join(config.outputPath, config.fileName);
    }
    fs.mkdirSync(path.dirname(config.outputPath), { recursive: true });
  }
  fs.writeFileSync(
    config.outputPath,
    `${config.pre.length ? `${config.pre}\n` : ''}${adjustHeadingLevel(
      stripAnsi(restyle(Core.usageMarkdown()))
    )
      .replace('Usage:\n\n```', '## Usage:\n\n```bash')
      .replace(
        '#### `-h --help',
        '## Arguments\n\n#### `-h --help'
      )}${config.post.length ? `\n${config.post}` : ''}`
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
          '#'.repeat(heading.length + config.headingLevelAdjustment)
        );
      }
      return line;
    })
    .join('\n');
}
