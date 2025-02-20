import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Env } from '@battis/qui-cli.env';
import { Log } from '@battis/qui-cli.log';
import { Progress } from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { Shell } from '@battis/qui-cli.shell';
import { Validators } from '@battis/qui-cli.validators';

export const colors = Colors;
export const env = Env;
export const log = Log;
export const progress = Progress;
export const root = Root;
export const shell = Shell;
export const validators = Validators;

let configured = false;

export function configure(config: Parameters<typeof Core.configure>[0] = {}) {
  configured = true;
  return Core.configure(config);
}

export function options(
  externalOptions: Parameters<typeof Core.options>[0] = {}
) {
  if (!configured) {
    configure();
  }
  return Core.options(externalOptions);
}

export function init(externalOptions: Parameters<typeof Core.init>[0]) {
  if (!configured) {
    configure();
  }
  return Core.init(externalOptions);
}
