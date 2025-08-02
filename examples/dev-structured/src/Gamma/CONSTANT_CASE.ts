import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';

export const name = 'CONSTANT_CASE';

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
