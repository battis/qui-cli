import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  foo?: string;
  bar?: string;
  baz?: boolean;
};

export const name = 'my-plugin';

const config: Configuration = {
  foo: 'foo',
  baz: false
};

export const configure = Plugin.Conf.defaultHook(config);

export function options(): Plugin.Options {
  return {
    man: [
      {
        level: 1,
        text: `${name} options`
      }
    ],
    opt: {
      foo: {
        description: `Type of foo-ness`,
        default: config.foo
      },
      bar: {
        description: 'Type of bar-ness'
      }
    },
    flag: {
      baz: {
        description: `Whether or not to baz`,
        default: config.baz
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export function run() {
  Log.info(`${config.foo} ${config.bar} ${config.baz ? 'baz' : 'not-baz'}`);
}

export function getFoo() {
  return config.foo;
}

export function isBaz() {
  return config.baz;
}
