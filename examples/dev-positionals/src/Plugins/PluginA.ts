import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';

export const name = 'PluginA';

const args = {
  a1: {
    description: `First named argument for ${name}`
  },
  a2: {
    description: `Second named argument for ${name}`
  }
};

Positionals.require(args);

export function run() {
  for (const arg of Object.keys(args)) {
    Log.info(
      `${name}: ${Colors.value(arg)} = ${Colors.quotedValue(Positionals.get(arg))}`
    );
  }
}
