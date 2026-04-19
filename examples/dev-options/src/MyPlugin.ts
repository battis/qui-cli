import { Env } from '@qui-cli/env';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  foo?: string;
};

export const name = 'my-plugin';

export const config: Configuration = {};

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export async function options(): Promise<Env.Options> {
  return {
    man: [{ level: 1, text: 'MyPlugin Options' }],
    opt: {
      foo: {
        description: 'bar',
        env: 'FOO'
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

export function run() {
  Log.info(`foo = ${config.foo}`);
}
