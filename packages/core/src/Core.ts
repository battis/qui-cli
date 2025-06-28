import * as Colors from '@battis/qui-cli.colors/dist/Colors.js';
import * as Plugin from '@battis/qui-cli.plugin';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';
import { usage } from './Usage.js';

export { Options } from '@battis/qui-cli.plugin';
export * from './Usage.js';

export type Configuration = Plugin.Registrar.Configuration & {
  /** @deprecated Use `jackspeak` property */
  core?: JackSpeak.Configuration & {
    /** @deprecated Use `Positional` plugin */
    requirePositionals?: boolean | number;
  };
};

let initialized = false;

export async function configure(config: Configuration = {}) {
  const { core = {}, jackspeak: jackOptions, positionals = {} } = config;
  const { requirePositionals, ...deprecated } = core;
  const jackspeak = {
    ...deprecated,
    allowPositionals:
      !!Positionals.requirePositionalsIsDeprecatedAndShouldNotBeUsed(
        positionals,
        requirePositionals
      ),
    ...jackOptions
  };
  if (jackspeak.allowPositionals === false) {
    positionals.max = 0;
  }
  await Plugin.Registrar.configure({ positionals, jackspeak });
}

export async function options(externalOptions: Plugin.Options = {}) {
  /*
   * TODO automate default value documentation
     Issue URL: https://github.com/battis/qui-cli/issues/38
   *  Including parsing `env` (#34) and `secret` (#33) fields
   */
  return Plugin.mergeOptions(await Plugin.Registrar.options(), externalOptions);
}

export async function init(
  externalOptions?: Plugin.Options
): Promise<Plugin.Arguments<Plugin.Options>> {
  if (initialized) {
    throw new Error(
      `Already initialized with user-provided command line arguments.`
    );
  }
  for (const plugin of Plugin.Registrar.registered()) {
    if (plugin.options) {
      JackSpeak.args(await plugin.options());
    }
  }
  if (externalOptions) {
    JackSpeak.args(externalOptions);
  }
  const args = JackSpeak.parse();
  await Plugin.Registrar.init(args);
  initialized = true;
  return args;
}

export async function run(
  externalOptions?: Plugin.Options
): Promise<Plugin.AccumulatedResults | undefined> {
  try {
    if (!initialized) {
      await init(externalOptions);
    }
    return await Plugin.Registrar.run();
  } catch (e) {
    const error = e as Error;
    console.log(`${Colors.error(error.message)}\n\n${usage()}`);
    process.exit(1);
  }
}
