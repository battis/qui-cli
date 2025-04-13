import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';

export const name = 'dev-structured/beta';
export const src = import.meta.dirname;

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
