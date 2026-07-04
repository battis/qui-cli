import { JackSpeak, Positionals } from '#plugins';
import * as Colors from '@qui-cli/colors/dist/Colors.js';
import * as Plugin from '@qui-cli/plugin';

export const name = 'core.usage';

function commandColor(usage: string) {
  const pre = usage.slice(0, usage.indexOf('\n  ') + 3);
  const cmd = usage.slice(pre.length, usage.indexOf(' ', pre.length));
  const terms = usage.slice(
    pre.length + cmd.length,
    usage.indexOf('-', pre.length + cmd.length) - 1
  );
  const post = usage.slice(pre.length + cmd.length + terms.length);
  return `${pre}${Colors.command(`${cmd}${terms}`, Colors.keyword)}${post}`;
}

function stringify(value: string | number | boolean | RegExp) {
  switch (typeof value) {
    case 'string':
      return Colors.quotedValue(`"${value}"`);
    case 'object':
      return Colors.regexpValue(value);
    default:
      return Colors.value(value);
  }
}

export const documentation: Plugin.Doc.Hook = (
  name,
  config,
  configType,
  multiple
) => {
  let docs = '';
  if (config.default !== undefined && !config.secret) {
    if (!docs.length) {
      docs = 'Default';
    }
    docs = `${docs}: ${
      Array.isArray(config.default)
        ? config.default.map((v) => stringify(v)).join(', ')
        : stringify(config.default)
    }`;
  }
  if (configType === 'boolean' && !multiple && config.default) {
    docs = `${docs}${docs.length ? ', u' : 'U'}se ${Colors.flagArg(`--no-${name}`)} to disable`;
  }
  if (docs.length) {
    if (config.description?.length) {
      config.description =
        `${config.description} (${docs})` as typeof config.description;
    } else {
      config.description = docs as typeof config.description;
    }
  }
  return config;
};

export function usage() {
  return Positionals.usage(commandColor(JackSpeak.usage()));
}

export function usageMarkdown() {
  return Positionals.usage(JackSpeak.usageMarkdown(), true);
}

export function run({ 'core.help': help }: Plugin.AccumulatedResults = {}) {
  if (help) {
    process.stdout.write(usage());
    process.exit(0);
  }
}
