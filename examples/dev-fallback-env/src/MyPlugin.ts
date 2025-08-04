import * as DefaultEnv from '@qui-cli/env/dist/Env.js';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

export const name = 'my-plugin';

let Env = Plugin.Registrar.registered().find(
  (plugin) => plugin.name === DefaultEnv.name
) as typeof DefaultEnv;
if (!Env) {
  Env = DefaultEnv;
  Plugin.register(DefaultEnv);
}

export function run() {
  Log.info(Env.get({ key: 'EXAMPLE' }));
}
