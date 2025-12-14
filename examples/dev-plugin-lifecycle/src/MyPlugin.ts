import '@qui-cli/env';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import path from 'node:path';

Root.configure({ root: path.dirname(import.meta.dirname) });

export type Configuration = Plugin.Configuration & {
  myOptParam?: string;
};

export const name = 'dev-env';

const config: Configuration = {};

function logState(step: string) {
  Log.info(
    Log.syntaxColor({
      [step]: {
        'process.env.MY_PARAM': process.env.MY_ENV_PARAM || 'undefined',
        myOptParam: config.myOptParam || 'undefined'
      }
    })
  );
}
logState('plugin imported');

export function configure(proposal: Configuration = {}, calledBy = 'hook') {
  logState(`configure() ${calledBy}`);
  Plugin.Conf.propose(config, proposal);
}

export function options(): Plugin.Options {
  logState('options() hook');
  return {
    man: [
      {
        level: 1,
        text: `${name} options`
      }
    ],
    opt: {
      myOptParam: {
        description: `My options parameter`
      }
    }
  };
}

export async function init({
  values
}: Plugin.ExpectedArguments<typeof options>) {
  logState('init() hook');
  configure(values, 'called by init()');
}

export function run() {
  logState('run() hook');
}
