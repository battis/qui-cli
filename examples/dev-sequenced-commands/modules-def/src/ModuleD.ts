import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import '@examples/dev-sequenced-commands.module-c';

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
