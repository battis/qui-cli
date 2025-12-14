import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  foo?: string;
  bar?: number;
};

export const name = 'dev-default-hooks';

const config: Configuration = {
  foo: 'argle bargle'
};

export const configure = Plugin.Conf.defaultHook(config);

export function options(): Plugin.Options {
  return {
    opt: {
      foo: { description: 'foo' }
    },
    num: {
      bar: { description: 'bar' }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export function run() {
  Log.info(config);
}
