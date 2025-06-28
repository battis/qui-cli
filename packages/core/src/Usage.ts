import * as Colors from '@battis/qui-cli.colors/dist/Colors.js';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

function commandColor(usage: string) {
  const pre = usage.slice(0, usage.indexOf('\n  ') + 3);
  const cmd = usage.slice(pre.length, usage.indexOf(' ', pre.length));
  const terms = usage.slice(
    pre.length + cmd.length,
    usage.indexOf('-', pre.length + cmd.length) - 1
  );
  const post = usage.slice(pre.length + cmd.length + terms.length);
  return `${pre}${Colors.command(`${Colors.keyword(cmd)}${terms}`)}${post}`;
}

export function usage() {
  return Positionals.usage(commandColor(JackSpeak.usage()));
}
