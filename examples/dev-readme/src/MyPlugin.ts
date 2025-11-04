import { Positionals } from '@qui-cli/core';
import * as Plugin from '@qui-cli/plugin';

export const name = 'dev-readme';

export function options(): Plugin.Options {
  Positionals.require({
    foo: {
      description: 'Enim minim laborum dolore, eiusmod.'
    },
    bar: {
      description: 'Cillum ut sit, labore.'
    }
  });
  return {
    man: [
      {
        level: 3,
        text: `${name} options`
      }
    ],
    flag: {
      argle: {
        description: 'Sint ipsum aliquip veniam tempor occaecat.',
        short: 'a'
      },
      bargle: {
        description: 'Tempor minim anim exercitation aliquip.'
      }
    },
    opt: {
      baz: {
        description: 'Reprehenderit consequat, veniam velit.'
      },
      buzz: {
        description: 'Aliquip sunt tempor nisi labore ad culpa.',
        short: 'z',
        default: 'Sit'
      }
    }
  };
}
