import * as Plugin from '@qui-cli/plugin';
import { Jack, JackOptions } from 'jackspeak';

export type Configuration = Plugin.Configuration & JackOptions;

export const name = 'jackspeak';

let instance: Jack | undefined = undefined;

export function jack() {
  if (!instance) {
    configure();
  }
  if (!instance) {
    throw new Error(`JackSpeak configuration failed.`);
  }
  return instance;
}

export function configure(config: Configuration = {}) {
  instance = new Jack(config);
}

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

export function parse() {
  return jack().parse();
}

export function toJSON() {
  return jack().toJSON();
}

export function usage() {
  return jack().usage();
}

export function usageMarkdown() {
  return jack().usageMarkdown();
}
