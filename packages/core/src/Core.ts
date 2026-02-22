import * as Plugin from '@qui-cli/plugin';
import { Base } from '@qui-cli/plugin/dist/Plugin.js';
import * as Help from './Help.js';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

export { Options } from '@qui-cli/plugin';
export * from './Usage.js';

/** Core configuration options */
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

// TODO improve typing
// Issue URL: https://github.com/battis/qui-cli/issues/100
// @ts-expect-error 2322
const config: Configuration = { lifoUsage: true };

/**
 * Configure core options
 *
 * May be called multiple times, overlaying partial configurations they become
 * available/defined
 *
 * @see {@link Configuration}
 */
export async function configure(proposal: Configuration = {}) {
  config.lifoUsage = Plugin.hydrate(proposal.lifoUsage, config.lifoUsage);
  const { core = {}, jackspeak: jackOptions, positionals = {} } = proposal;
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

/**
 * Initialize plugins from the environment and provided command line options
 *
 * May only be called once
 *
 * @param externalOptions Optional additional options to initialze
 * @returns Result of
 *   {@link https://github.com/isaacs/jackspeak?tab=readme-ov-file#jackparseargs-string--processargv--positionals-string-values-optionsresults- Jackspeak.parse()}
 *   (Additional Jackspeak configuration may be done via the {@link JackSpeak}
 *   core plugin)
 * @throws If invoked after {@link run} invocation or otherwise invoked for a
 *   second time
 */
export async function init(
  externalOptions?: Plugin.Options
): Promise<Plugin.Arguments<Plugin.Options>> {
  if (initialized) {
    throw new Error(
      `Already initialized with user-provided command line arguments.`
    );
  }
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
  if (config.lifoUsage) {
    usage.reverse();
  }

  JackSpeak.args(Help.options());
  JackSpeak.args(Positionals.options());
  for (const options of usage) {
    JackSpeak.args(options);
  }

  const args = JackSpeak.parse();
  await Plugin.Registrar.init(args);
  initialized = true;
  return args;
}

/**
 * Initialize plugins from provided command line options and the environment, if
 * not already initialized and run registered plugins.
 *
 * @param externalOptions Optional additional options to initialze
 * @returns Hash of accumulated results of all plugin `run()` methods
 */
export async function run(
  externalOptions?: Plugin.Options
): Promise<Plugin.AccumulatedResults | undefined> {
  if (!initialized) {
    await init(externalOptions);
  }
  return await Plugin.Registrar.run();
}
