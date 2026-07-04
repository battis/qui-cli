import { Core } from '@qui-cli/core';
import '@qui-cli/env';
import * as Plugin from '@qui-cli/plugin';
import { Log } from '@qui-cli/log';
import { Env } from '@qui-cli/env';
import path from 'node:path';

Env.configure({ path: path.join(import.meta.dirname, '../.env') });

type Configuration = Plugin.Configuration & {
  foo?: string;
  foos?: string[];
  bar?: number;
  bars?: number[];
  baz?: boolean;
  bazzes?: boolean[];
};

const config: Configuration = {};

function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

function options() {
  return {
    man: [{ level: 1, text: 'dev-env-options Options' }],
    opt: { foo: { description: 'foo', default: config.foo, env: 'FOO' } },
    optList: {
      foos: { description: 'foos', default: config.foos, env: 'FOOS' }
    },
    num: { bar: { description: 'bar', default: config.bar, env: 'BAR' } },
    numList: {
      bars: { description: 'bars', default: config.bars, env: 'BARS' }
    },
    flag: { baz: { description: 'baz', default: config.baz, env: 'BAZ' } },
    flagList: {
      bazzes: { description: 'bazzes', default: config.bazzes, env: 'BAZZES' }
    }
  };
}

function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure(values);
}

function run() {
  Log.info(config);
}

await Plugin.register({
  name: 'dev-env-options',
  configure,
  options,
  init,
  run
});
await Core.run();
