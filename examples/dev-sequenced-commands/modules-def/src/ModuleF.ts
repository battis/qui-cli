import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import './e.js';

export type Configuration = Plugin.Configuration & {
  'option-f'?: string;
};

export const name = 'module-f';
export const src = import.meta.dirname;

let optionF: string | undefined = 'f';

export function configure(config: Configuration = {}) {
  optionF = Plugin.hydrate(config['option-f'], optionF);
}

export function options() {
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
