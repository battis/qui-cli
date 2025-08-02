import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import './d.js';

export type Configuration = Plugin.Configuration & {
  'option-e'?: string;
};

export const name = 'module-e';

let optionE: string | undefined = 'e';

export function configure(config: Configuration = {}) {
  optionE = Plugin.hydrate(config['option-e'], optionE);
}

export function options(): Plugin.Options {
  return {
    opt: {
      'option-e': {
        description: 'Option E'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  optionE = Plugin.hydrate(values['option-e'], optionE);
}

export function run(results?: Plugin.AccumulatedResults) {
  Log.debug({ plugin: name, results });
  Log.info(`Option E is ${Colors.quotedValue(`"${optionE}"`)}`);
  return optionE;
}
