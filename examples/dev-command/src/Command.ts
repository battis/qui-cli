import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';

export type Configuration = Plugin.Configuration & {
  foo?: string;
};

export const name = 'my-command';
export const src = import.meta.dirname;

let foo: string | undefined = undefined;

export function configure(config: Configuration = {}) {
  foo = Plugin.hydrate(config.foo, foo);
}

export function options(): Plugin.Options {
  return {
    opt: {
      foo: {
        description: 'Type of foo-ness'
      }
    }
  };
}

export function init({ values }: Plugin.Arguments<ReturnType<typeof options>>) {
  foo = Plugin.hydrate(values.foo, foo);
}

export function run() {
  Log.info(
    `The value of ${Colors.value('foo')} is ${Colors.quotedValue(`"${foo}"`)}`
  );
}
