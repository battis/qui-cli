import { Positionals } from '@qui-cli/core';
import { Env } from '@qui-cli/env';
import * as Plugin from '@qui-cli/plugin';
import path from 'node:path';

Env.configure({ root: path.dirname(import.meta.dirname) });

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
        description: 'Tempor minim anim exercitation aliquip.',
        default: true
      }
    },
    opt: {
      baz: {
        description: 'Reprehenderit consequat, veniam velit.',
        env: 'BAZ'
      },
      buzz: {
        description: 'Aliquip sunt tempor nisi labore ad culpa.',
        short: 'z',
        default: 'Sit'
      },
      biz: {
        env: 'BIZ',
        secret: true
      }
    },
    num: {
      pi: {
        description: 'Esse eiusmod exercitation nulla nostrud do velit id.',
        env: 'PI',
        default: 3.2
      }
    },
    optList: {
      a: {
        default: ['foo', 'bar', 'baz']
      }
    }
  };
}
