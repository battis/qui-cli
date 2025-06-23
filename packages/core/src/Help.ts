import * as Plugin from '@battis/qui-cli.plugin';
import * as Core from './Core.js';

export type Configuration = Plugin.Configuration & {
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
        description: 'Get usage information',
        short: 'h'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export function run() {
  if (help) {
    console.log(Core.usage());
    process.exit(0);
  }
}
