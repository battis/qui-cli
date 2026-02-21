import * as Plugin from '@qui-cli/plugin';
import { Base } from '@qui-cli/plugin/dist/Plugin.js';
import * as Help from './Help.js';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

export { Options } from '@qui-cli/plugin';
export * from './Usage.js';

export type Configuration = Plugin.Registrar.Configuration & {
  /**
   * Usage information for plugins is diplayed in LIFO (last-in, first-out)
   * order, putting the plug-in that requires other plug-ins at the top and the
   * plug-ins required by other plug-ins at the bottom.
   *
   * To display plugins in FIFO order (as in qui-cli/core@<6.0.1), set
   * `lifoUsage` to false
   */
  lifoUsage?: boolean;

  /** @deprecated Use {@link JackSpeak} core plugin */
  core?: JackSpeak.Configuration & {
    /** @deprecated Use {@link Positionals} core plugin */
    requirePositionals?: boolean | number;
  };
};

let initialized = false;
let lifoUsage = true;

export async function configure(config: Configuration = {}) {
  lifoUsage = Plugin.hydrate(config.lifoUsage, lifoUsage);
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

function requireUnusedOptions(
  plugin: Base
): plugin is Base & { options: NonNullable<Base['options']> } {
  return (
    !!plugin.options &&
    plugin.name !== Positionals.name &&
    plugin.name !== Help.name
  );
}

export async function init(
  externalOptions?: Plugin.Options
): Promise<Plugin.Arguments<Plugin.Options>> {
  if (initialized) {
    throw new Error(
      `Already initialized with user-provided command line arguments.`
    );
  }
  JackSpeak.args(Help.options());
  JackSpeak.args(Positionals.options());
  const usage = [
    ...(await Promise.all(
      Plugin.Registrar.registered()
        .filter(requireUnusedOptions)
        .map(async (plugin) => await plugin.options())
    ))
  ];
  if (externalOptions) {
    usage.push(Plugin.documentDefaults(externalOptions));
  }
  if (lifoUsage) {
    usage.reverse();
  }
  for (const options of usage) {
    JackSpeak.args(options);
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
