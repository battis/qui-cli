import { Colors } from '@battis/qui-cli.colors';
import { Core, Options as CoreOptions } from '@battis/qui-cli.core';
import { Env, Options as EnvOptions } from '@battis/qui-cli.env';
import { Log, Options as LogOptions } from '@battis/qui-cli.log';
import * as plugin from '@battis/qui-cli.plugin';
import progress from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { Shell, Options as ShellOptions } from '@battis/qui-cli.shell';
import { Validators } from '@battis/qui-cli.validators';
import * as prompts from '@inquirer/prompts';

export type Configuration = {
  colors?: boolean;
  env?: boolean;
  log?: boolean;
  shell?: boolean;
  validators?: boolean;
};

export type Options = {
  env?: EnvOptions;
  args?: CoreOptions;
  log?: LogOptions;
  shell?: ShellOptions;
};

export type Arguments<O extends plugin.Options = plugin.Options> =
  plugin.Arguments<ReturnType<Env['options']>> &
    plugin.Arguments<ReturnType<Log['options']>> &
    plugin.Arguments<ReturnType<Shell['options']>> &
    plugin.Arguments<O>;

export class CLI {
  private static defaults = {
    env: Env.defaults,
    args: Core.defaults,
    log: Log.defaults,
    shell: Shell.defaults
  };

  private static pluginMap: { [key in keyof Configuration]: any } = {
    env: Env,
    log: Log,
    shell: Shell,
    validators: Validators,
    colors: Colors
  };

  public options = {
    defaults: CLI.defaults,
    hydrate: (
      options: Partial<{
        env: Partial<EnvOptions>;
        args: Partial<CoreOptions>;
        log: Partial<LogOptions>;
        shell: Partial<ShellOptions>;
      }>
    ): Options => {
      return {
        env: { ...CLI.defaults.env, ...options?.env },
        args: { ...CLI.defaults.args, ...options?.args },
        log: { ...CLI.defaults.log, ...options?.log },
        shell: { ...CLI.defaults.shell, ...options?.shell }
      };
    }
  };

  private static singleton: CLI;

  public static getInstance(config: Configuration = {}) {
    if (!this.singleton) {
      this.singleton = new CLI(config);
    } else {
      this.singleton.reset(config);
    }
    return this.singleton;
  }

  private config: Configuration = {};
  private core: Core;

  public readonly root = Root.getInstance();
  public env: Env = undefined as any;
  public log: Log = undefined as any;
  public shell: Shell = undefined as any;
  public validators: Validators = undefined as any;
  public colors: Colors = undefined as any;

  public readonly progress = progress;

  /** @deprecated use @inquirer/prompts directly */
  public readonly prompts = prompts;

  public constructor(config: Configuration = {}) {
    this.core = new Core();
    this.reset(config);
  }

  private reset(config: Configuration = {}) {
    this.config = config;
    for (const plugin in Object.keys(CLI.pluginMap)) {
      if (config[plugin as keyof Configuration]) {
        this[plugin as keyof this] =
          CLI.pluginMap[plugin as keyof Configuration].getInstance();
      } else {
        this[plugin as keyof this] = undefined as any;
      }
    }
  }

  public init({ env, args, log, shell }: Options = {}) {
    const {
      requirePositionals,
      allowPositionals,
      envPrefix,
      env: _env,
      usage,
      stopAtPositional,
      ...options
    } = args || {};
    Root.getInstance({ root: env?.root });
    if (this.config.env) {
      Env.getInstance(env);
    }
    if (this.config.log) {
      Log.getInstance(log);
    }
    if (this.config.shell) {
      Shell.getInstance(shell);
    }
    return this.core.init(args) as Arguments<typeof options>;
  }

  /** @deprecated use cli.root.path() */
  public appRoot() {
    return this.root.path();
  }

  public register(plugin: plugin.Base) {
    this.core?.register(plugin);
  }
}

const cli = CLI.getInstance();
export { cli as default };
