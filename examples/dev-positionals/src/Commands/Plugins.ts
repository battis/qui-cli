import { Log } from '@battis/qui-cli.log';
import { register } from '@battis/qui-cli.plugin';
import { Positionals } from '@qui-cli/core';
import * as Plugin from '../Plugins/index.js';

await register(Plugin.A);
await register(Plugin.B);
await register(Plugin.C);

export const name = 'only-named-positionals';

export function options() {
  return {
    man: [
      {
        text: 'Note that, because plugin B depends on plugin C, plugin C loads its positionals before plugin B'
      }
    ]
  };
}

export function run() {
  Log.info(
    Log.syntaxColor({
      named: Positionals.namedArgs(),
      unnamed: Positionals.unnamedArgs()
    })
  );
}
