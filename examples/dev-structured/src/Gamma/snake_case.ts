import { Log } from '@battis/qui-cli.log';
import { Colors } from '@qui-cli/colors';

export const name = 'snake_case';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
