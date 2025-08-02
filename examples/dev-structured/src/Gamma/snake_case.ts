import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';

export const name = 'snake_case';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
