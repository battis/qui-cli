import { Positionals } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';

export const name = 'default';

export function run() {
  Log.info(
    Log.syntaxColor({
      named: Positionals.namedArgs(),
      unnamed: Positionals.unnamedArgs()
    })
  );
}
