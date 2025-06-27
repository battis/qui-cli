import * as Plugin from '@battis/qui-cli.plugin';
import { Jack, JackOptions } from 'jackspeak';

export type Configuration = Plugin.Configuration & JackOptions;

export const name = 'jackspeak';

let instance: Jack | undefined = undefined;

function jack() {
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

export function args({
  num,
  numList,
  opt,
  optList,
  flag,
  flagList,
  fields,
  man = []
}: Plugin.Options) {
  jack()
    .num({ ...num })
    .numList({ ...numList })
    .opt({ ...opt })
    .optList({ ...optList })
    .flag({ ...flag })
    .flagList({ ...flagList })
    .addFields({ ...fields });
  for (const paragraph of man) {
    if (paragraph.level) {
      jack().heading(paragraph.text, paragraph.level, {
        pre: paragraph.pre
      });
    } else {
      jack().description(paragraph.text, { pre: paragraph.pre });
    }
  }
}

export function parse() {
  return jack().parse();
}

export function usage() {
  return jack().usage();
}

export function usageMarkdown() {
  return jack().usageMarkdown();
}
