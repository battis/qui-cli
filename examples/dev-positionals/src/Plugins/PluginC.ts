import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';
import { Options, register } from '@qui-cli/plugin';

export const name = 'PluginC';

const args = {
  c1: {
    description: `First named argument for ${name}`
  },
  c2: {
    description: `Second named argument for ${name}`
  }
};

export function options(): Options {
  Positionals.require(args);
  return {};
}

export function run() {
  for (const arg of Object.keys(args)) {
    Log.info(
      `${name}: ${Colors.optionArg(arg)} = ${Colors.quotedValue(Positionals.get(arg))}`
    );
  }
}

await register({ name, options, run });
