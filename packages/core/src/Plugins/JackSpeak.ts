import * as Plugin from '@qui-cli/plugin';
import { Jack, JackOptions } from 'jackspeak';

export type Configuration = Plugin.Configuration & JackOptions;

export const name = 'jackspeak';

const config: Configuration = {};
let instance: Jack | undefined = undefined;

/** Jackspeak instance used to parse command line arguments */
export function jack() {
  if (!instance) {
    instance = new Jack(config);
  }
  if (!instance) {
    throw new Error(`JackSpeak configuration failed.`);
  }
  return instance;
}

/**
 * Configure Jackspeak options
 *
 * @see {@link JackOptions}
 */
export function configure(proposal: Configuration = {}) {
  let changed = false;
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      changed = config[key] !== proposal[key];
      config[key] = proposal[key];
    }
  }
  if (changed) {
    instance = undefined;
  }
}

/**
 * Apply {@link Plugin.Options} to Jackspeak
 *
 * Generally called only by Core
 */
export function args(options: Plugin.Options) {
  for (const key in options) {
    if (key === 'man') {
      for (const paragraph of options[key]!) {
        if (paragraph.level) {
          jack().heading(paragraph.text, paragraph.level, {
            pre: paragraph.pre
          });
        } else {
          jack().description(paragraph.text, { pre: paragraph.pre });
        }
      }
    } else if (key === 'fields') {
      jack().addFields({ ...options[key] });
    } else {
      // @ts-expect-error 7053 typing is hard
      jack()[key]({ ...options[key] });
    }
  }
}

/**
 * Convenience pass-through to
 * {@link https://github.com/isaacs/jackspeak?tab=readme-ov-file#jackparseargs-string--processargv--positionals-string-values-optionsresults- Jackspeak.parse()}
 */
export function parse() {
  return jack().parse();
}

/** Convenience pass-through to (undocumented) Jackspeak.toJSON() */
export function toJSON() {
  return jack().toJSON();
}

/**
 * Convenience pass-through to
 * {@link https://github.com/isaacs/jackspeak?tab=readme-ov-file#jackusage-string Jackspeak.usage()}
 */
export function usage() {
  return jack().usage();
}

/**
 * Convenience pass-through to
 * {@link https://github.com/isaacs/jackspeak?tab=readme-ov-file#jackusagemarkdown-string Jackspeak.usageMarkdown()}
 */
export function usageMarkdown() {
  return jack().usageMarkdown();
}
