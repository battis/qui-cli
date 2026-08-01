import * as Plugin from '@qui-cli/plugin';
import { Log } from '@qui-cli/log';

/**
 * Define configuration parameters (some or all may also be command line
 * arguments… but do not _have_ to be.)
 */
export type Configuration = Plugin.Configuration & {
  optionA?: string;
  optionB?: number;
};

/**
 * Define a dependency-tree unique plugin name. This is used to avoid including
 * multiple versions of the same plugin in the same dependency tree.
 */
export const name = '@examples/my-plugin';

/** Internal configuration settings */
const config: Configuration = {
  optionB: 42
};

/**
 * Describe expected command line arguments, the syntax of which maps directly
 * on to {@link https://www.npmjs.com/package/jackspeak JackSpeak's}
 * configuration options
 */
export function options() {
  return {
    man: [{ level: 1, text: 'MyPlugin Options' }],
    opt: {
      optionA: {
        description: `A text value`,
        short: 'a',
        /**
         * If a command line argument maps to a config option, using the config
         * value as the default means that consumers can configure alternate
         * default values that will be shown in the command line usage report
         */
        default: config.optionA
      }
    },
    num: {
      optionB: {
        description: `A number value`,
        short: 'b',
        default: config.optionB
      }
    }
  };
}

/** Apply a proposed configuration update to the internal configuration */
export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

/** Initialize the internal configuration from the command line arguments */
export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}
/** The body of the script */
export async function run() {
  if (config.optionA) {
    Log.info(`You said: "${config.optionA}"`);
  }
  if (config.optionB !== undefined) {
    Log.info(`Your number is: ${config.optionB}`);
  }
}
