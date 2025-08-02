import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import '@examples/dev-sequenced-commands.module-a';
import { Colors } from '@qui-cli/colors';

export type Configuration = Plugin.Configuration & {
  'option-b'?: string;
};

export const name = 'module-b';

let optionB: string | undefined = 'b';

export function configure(config: Configuration = {}) {
  optionB = Plugin.hydrate(config['option-b'], optionB);
}

export function options(): Plugin.Options {
  return {
    opt: {
      'option-b': {
        description: 'Option B'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  optionB = Plugin.hydrate(values['option-b'], optionB);
}

export function run(results?: Plugin.AccumulatedResults) {
  Log.debug({ plugin: name, results });
  Log.info(`Option B is ${Colors.quotedValue(`"${optionB}"`)}`);
  return optionB;
}
