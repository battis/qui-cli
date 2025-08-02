import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';

export const name = 'finite-named';

Positionals.requireAtLeastUnnamedArgs(4);
Positionals.requireNoMoreThanUnnamedArgs(8);

export function run() {
  Log.info(
    Log.syntaxColor({
      named: Positionals.namedArgs(),
      unnamed: Positionals.unnamedArgs()
    })
  );
}
