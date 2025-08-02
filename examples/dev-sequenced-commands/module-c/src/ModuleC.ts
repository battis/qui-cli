import '@examples/dev-sequenced-commands.module-b';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  'option-c'?: string;
};

export const name = 'module-c';

let optionC: string | undefined = 'c';

export function configure(config: Configuration = {}) {
  optionC = Plugin.hydrate(config['option-c'], optionC);
}

export function options(): Plugin.Options {
  return {
    opt: {
      'option-c': {
        description: 'Option C'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  optionC = Plugin.hydrate(values['option-c'], optionC);
}

export function run(results?: Plugin.AccumulatedResults) {
  Log.debug({ plugin: name, results });
  Log.info(`Option C is ${Colors.quotedValue(`"${optionC}"`)}`);
  return optionC;
}
