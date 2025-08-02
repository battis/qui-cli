import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import './e.js';

export type Configuration = Plugin.Configuration & {
  'option-f'?: string;
};

export const name = 'module-f';

let optionF: string | undefined = 'f';

export function configure(config: Configuration = {}) {
  optionF = Plugin.hydrate(config['option-f'], optionF);
}

export function options(): Plugin.Options {
  return {
    opt: {
      'option-f': {
        description: 'Option F'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  optionF = Plugin.hydrate(values['option-f'], optionF);
}

export function run(results?: Plugin.AccumulatedResults) {
  Log.debug({ plugin: name, results });
  Log.info(`Option F is ${Colors.quotedValue(`"${optionF}"`)}`);
  return optionF;
}
