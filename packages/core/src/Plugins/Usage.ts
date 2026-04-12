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

export function usage() {
  return Positionals.usage(commandColor(JackSpeak.usage()));
}

export function usageMarkdown() {
  return Positionals.usage(JackSpeak.usageMarkdown());
}

export function run({ 'core.help': help }: Plugin.AccumulatedResults = {}) {
  if (help) {
    process.stdout.write(usage());
    process.exit(0);
  }
}
