import { Positionals } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';
import { register } from '@battis/qui-cli.plugin';
import { Colors } from '@qui-cli/colors';
import * as PluginC from './PluginC.js';

// PluginB depends on PluginC
await register(PluginC);

export const name = 'PluginB';

const args = {
  b1: {
    description: `First named argument for ${name}`
  },
  b2: {
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
