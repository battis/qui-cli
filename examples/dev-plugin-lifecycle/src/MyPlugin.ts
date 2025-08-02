import { Log } from '@battis/qui-cli.log';
import '@qui-cli/env';
import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import path from 'node:path';

Root.configure({ root: path.dirname(import.meta.dirname) });

export type Configuration = Plugin.Configuration & {
  myOptParam?: string;
};

export const name = 'dev-env';

let myOptParam: string | undefined = undefined;

function logState(step: string) {
  Log.info(
    Log.syntaxColor({
      [step]: {
        'process.env.MY_PARAM': process.env.MY_ENV_PARAM || 'undefined',
        myOptParam: myOptParam || 'undefined'
      }
    })
  );
}
logState('plugin imported');

export function configure(config: Configuration = {}, calledBy = 'hook') {
  logState(`configure() ${calledBy}`);
  myOptParam = Plugin.hydrate(config.myOptParam, myOptParam);
}

export function options(): Plugin.Options {
  logState('options() hook');
  return {
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
