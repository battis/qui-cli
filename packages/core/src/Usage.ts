import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

export function usage() {
  return Positionals.usage(JackSpeak.usage());
}

export function usageMarkdown() {
  return Positionals.usageMarkdown(JackSpeak.usageMarkdown());
}
