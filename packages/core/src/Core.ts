import { Help, JackSpeak, Positionals } from '#plugins';
import * as Plugin from '@qui-cli/plugin';
import { Base } from '@qui-cli/plugin/dist/Plugin.js';
import { ArrayElement, EmptyObject } from '@battis/typescript-tricks';
export { Options } from '@qui-cli/plugin';

/** Core configuration options */
export type Configuration = {
  [name: string]: Plugin.Conf.Base | boolean | undefined;

  /**
   * Usage information for plugins is diplayed in LIFO (last-in, first-out)
   * order, putting the plug-in that requires other plug-ins at the top and the
   * plug-ins required by other plug-ins at the bottom.
   *
   * To display plugins in FIFO order (as in qui-cli/core@<6.0.1), set
   * `lifoUsage` to false
   */
  lifoUsage?: boolean;

  jackspeak?: JackSpeak.Configuration;
  positionals?: Positionals.Configuration;

  /** @deprecated Use {@link JackSpeak} core plugin */
  core?: JackSpeak.Configuration & {
    /** @deprecated Use {@link Positionals} core plugin */
    requirePositionals?: boolean | number;
  };
};

let initialized = false;

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
    usage.push(await Plugin.Registrar.documentation(externalOptions));
  }
  if (config.lifoUsage) {
    usage.reverse();
  }

  JackSpeak.args(Positionals.options());
  JackSpeak.args(Help.options());
  for (const options of usage) {
    JackSpeak.args(options);
  }

  const args = JackSpeak.parse() as Exclude<
    | { [K in keyof ArrayElement<typeof usage>['num']]?: number }
    | {
        [K in keyof ArrayElement<typeof usage>['numList']]?: number[];
      }
    | { [K in keyof ArrayElement<typeof usage>['opt']]?: string }
    | {
        [K in keyof ArrayElement<typeof usage>['optList']]?: string[];
      }
    | { [K in keyof ArrayElement<typeof usage>['flag']]?: boolean }
    | {
        [K in keyof ArrayElement<typeof usage>['flagList']]?: boolean[];
      },
    EmptyObject
  >;
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
