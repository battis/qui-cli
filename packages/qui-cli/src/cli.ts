import { Colors } from '@battis/qui-cli.colors';
import { Core, Options as CoreOptions } from '@battis/qui-cli.core';
import { Env, Configuration as EnvOptions } from '@battis/qui-cli.env';
import { Log, Configuration as LogOptions } from '@battis/qui-cli.log';
import Plugin from '@battis/qui-cli.plugin';
import Progress from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { Shell, Configuration as ShellOptions } from '@battis/qui-cli.shell';
import { Validators } from '@battis/qui-cli.validators';

export type Options = {
  env?: EnvOptions;
  args?: CoreOptions;
  log?: LogOptions;
  shell?: ShellOptions;
};

export type Arguments<O extends Plugin.Options = Plugin.Options> =
  Plugin.Arguments<ReturnType<(typeof Env)['options']>> &
    Plugin.Arguments<ReturnType<(typeof Log)['options']>> &
    Plugin.Arguments<ReturnType<(typeof Shell)['options']>> &
    Plugin.Arguments<O>;

const core = new Core();
await core.register(Root);
await core.register(Colors);
await core.register(Env);
await core.register(Log);
await core.register(Shell);
await core.register(Validators);

export const root = Root;
export const env = Env;
export const log = Log;
export const shell = Shell;
export const validators = Validators;
export const colors = Colors;

const progress = Progress;

export async function init({ env, args, log, shell }: Options = {}) {
  const {
    requirePositionals,
    allowPositionals,
    envPrefix,
    env: _env,
    usage,
    stopAtPositional,
    ...options
  } = args || {};

  await Root.configure({ root: env?.root });
  await Env.configure(env);
  await Log.configure(log);
  await Shell.configure(shell);

  return core.init(args) as Arguments<typeof options>;
}

export function register(plugin: Plugin.Container) {
  core?.register(plugin);
}
