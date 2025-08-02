import { Log } from '@battis/qui-cli.log';
import { Positionals } from '@qui-cli/core';

export const name = 'only-named';

Positionals.allowOnlyNamedArgs();
Positionals.require({
  first: { description: 'First positional argument' },
  second: { description: 'Second positional argument' }
});

export function run() {
  Log.info(
    Log.syntaxColor({
      named: Positionals.namedArgs(),
      unnamed: Positionals.unnamedArgs()
    })
  );
}
