import { Log } from '@battis/qui-cli.log';
import { Positionals } from '@qui-cli/core';

export const name = 'default';

export function run() {
  Log.info(
    Log.syntaxColor({
      named: Positionals.namedArgs(),
      unnamed: Positionals.unnamedArgs()
    })
  );
}
