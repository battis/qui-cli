import { Colors } from '@qui-cli/colors';
import { Positionals } from '@qui-cli/core';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

/**
 * The expected configuration parameters, which may the same as or different
 * from the command line options
 */
export type Configuration = Plugin.Configuration & {
  target?: string;
  text?: string;
  number?: number;
  flag?: boolean;
};

/**
 * Configure positionals outside of the hooks, so that you don't run the risk of
 * having the configuration invoked multiple times, creating a series of
 * unanticipated positional arguments
 */
Positionals.require({
  target: {
    description: 'A positional text argument'
  }
});
Positionals.allowOnlyNamedArgs();
Positionals.requireAtLeast(0);

/** A unique name for the command to identify it within the Plugin.Registrar */
export const name = 'distributable-command';

const config: Configuration = {
  number: 2.171
};

/**
 * The command line optoons that the can be passed to the command
 *
 * @returns Plugin.Options …but don't declare that, because it is _way_ more
 *   useful to have it typed as the literal object that it returns
 */
export function options() {
  return {
    man: [{ level: 1, text: 'Command Options' }],
    opt: {
      text: {
        description: 'A text parameter',
        short: 't',
        hint: Colors.quotedValue(`"argle bargle"`)
      }
    },
    num: {
      number: {
        description: 'A numeric parameter',
        hint: Colors.value('3.14159'),
        /**
         * Setting defaults in the config variable above allows
         * pre-initialization updates to the defaults by other modules that
         * depend on this one
         */
        default: config.number
      }
    },
    flag: {
      flag: {
        description: 'A boolean parameter',
        short: 'f'
      }
    }
  };
}

/**
 * Update the configuration (may be called by other modules and may be called
 * multiple times)
 */
export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

/** Initialize the command with the command line arguments */
export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure({ target: Positionals.get('target'), ...values });
}

/** The actual "business logic" of the command */
export async function run() {
  Log.syntaxColor({ config });
}
