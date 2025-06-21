import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import path from 'node:path';

export const name = 'dev-structured/alpha/one';
export const src = path.dirname(import.meta.dirname);

export function run() {
  Log.info(`${Colors.command(name)} ran!`);
}
