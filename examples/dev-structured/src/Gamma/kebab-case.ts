import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';

export const name = 'kebab-case';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
