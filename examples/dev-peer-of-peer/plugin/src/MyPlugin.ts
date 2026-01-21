import { Env } from '@qui-cli/env';
import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  optA?: string;
  optB?: number;
};

export const name = 'peer-of-peer plugin';

const config: Configuration = {};

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export function options(): Plugin.Options {
  return {
    opt: {
      optA: {
        description: 'A string',
        default: config.optA
      }
    },
    num: {
      optB: {
        description: 'A number',
        default: config.optB
      }
    }
  };
}

export async function init({
  values
}: Plugin.ExpectedArguments<typeof options>) {
  configure({
    optA: await Env.get({ key: 'OPT_A' }),
    optB: parseInt((await Env.get({ key: 'OPT_B' })) || '0'),
    ...values
  });
}

export function getConfiguration() {
  return config;
}
