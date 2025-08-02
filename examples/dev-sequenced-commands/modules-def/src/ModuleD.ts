import { Log } from '@battis/qui-cli.log';
import '@examples/dev-sequenced-commands.module-c';
import { Colors } from '@qui-cli/colors';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  'option-d'?: string;
};

export const name = 'module-d';

let optionD: string | undefined = 'd';

export function configure(config: Configuration = {}) {
  optionD = Plugin.hydrate(config['option-d'], optionD);
}

export function options(): Plugin.Options {
  return {
    opt: {
      'option-d': {
        description: 'Option D'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  optionD = Plugin.hydrate(values['option-d'], optionD);
}

export function run(results?: Plugin.AccumulatedResults) {
  Log.debug({ plugin: name, results });
  Log.info(`Option D is ${Colors.quotedValue(`"${optionD}"`)}`);
  return optionD;
}
