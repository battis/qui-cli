import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';

export type Configuration = Plugin.Configuration & {
  'option-a'?: string;
};

export const name = 'module-a';

let optionA: string | undefined = 'a';

export function configure(config: Configuration = {}) {
  optionA = Plugin.hydrate(config['option-a'], optionA);
}

export function options(): Plugin.Options {
  return {
    opt: {
      'option-a': {
        description: 'Option A'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  optionA = Plugin.hydrate(values['option-a'], optionA);
}

export function run(results?: Plugin.AccumulatedResults) {
  Log.debug({ plugin: name, results });
  Log.info(`Option A is ${Colors.quotedValue(`"${optionA}"`)}`);
  return optionA;
}
