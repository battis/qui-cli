import { Log } from '@battis/qui-cli.log';
import { Colors } from '@qui-cli/colors';

export const name = 'UPPER';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
