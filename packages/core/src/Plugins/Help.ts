import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  /** Get usage information */
  help?: boolean;
};

export const name = 'core.help';

let help = false;

export function configure(config: Configuration = {}) {
  help = Plugin.hydrate(config.help, help);
}

export function options(): Plugin.Options {
  return {
    flag: {
      help: {
        description: 'Show this usage information',
        short: 'h'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export function run() {
  return true;
}
