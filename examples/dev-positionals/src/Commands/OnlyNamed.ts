import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';

export const name = 'only-named';

Positionals.configure({
  description: `${Colors.positionalArg('second')} has no description or hint, and so is not listed below`
});
Positionals.allowOnlyNamedArgs();
Positionals.require({
  first: {
    description: 'First positional argument',
    hint: Colors.quotedValue('"foo"')
  },
  second: {}
});

export function run() {
  Log.info(
    Log.syntaxColor({
      named: Positionals.namedArgs(),
      unnamed: Positionals.unnamedArgs()
    })
  );
}
