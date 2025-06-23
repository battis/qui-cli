import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';

export const name = 'one';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
