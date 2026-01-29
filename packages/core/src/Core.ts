import * as Plugin from '@qui-cli/plugin';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

export { Options } from '@qui-cli/plugin';
export * from './Usage.js';

export type Configuration = Plugin.Registrar.Configuration & {
  /** @deprecated Use {@link JackSpeak} core plugin */
  core?: JackSpeak.Configuration & {
    /** @deprecated Use {@link Positionals} core plugin */
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
    JackSpeak.args(Plugin.documentDefaults(externalOptions));
  }
  const args = JackSpeak.parse();
  await Plugin.Registrar.init(args);
  initialized = true;
  return args;
}

export async function run(
  externalOptions?: Plugin.Options
): Promise<Plugin.AccumulatedResults | undefined> {
  if (!initialized) {
    await init(externalOptions);
  }
  return await Plugin.Registrar.run();
}
