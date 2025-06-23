import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';

export const name = 'CONSTANT_CASE';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
