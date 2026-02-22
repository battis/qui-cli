import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';
import { Options, register } from '@qui-cli/plugin';
import './PluginC.js';

export const name = 'PluginB';

const args = {
  b1: {
    description: `First named argument for ${name}`
  },
  b2: {
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
