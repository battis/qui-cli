import { Log } from '@battis/qui-cli.log';
import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';

export const name = 'PluginC';

const args = {
  c1: {
    description: `First named argument for ${name}`
  },
  c2: {
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
