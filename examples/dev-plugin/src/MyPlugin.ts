import * as Plugin from '@battis/qui-cli.plugin';

export type Configuration = Plugin.Configuration & {
  foo?: string;
};

export const name = 'my-plugin';
export const src = import.meta.dirname;

let foo = 'foo';
let bar: string | undefined = undefined;
let baz = false;

export function configure(config: Configuration = {}) {
  foo = Plugin.hydrate(config.foo, foo);
}

export function options(): Plugin.Options {
  return {
    opt: {
      foo: {
        description: `Type of foo-ness (default ${foo})`,
        default: foo
      },
      bar: {
        description: 'Type of bar-ness'
      }
    },
    flag: {
      baz: {
        description: `Whether or not to baz (default ${baz})`,
        default: baz
      }
    }
  };
}

export function init({ values }: Plugin.Arguments<ReturnType<typeof options>>) {
  foo = Plugin.hydrate(values.foo, foo);
  bar = Plugin.hydrate(values.bar, bar);
  baz = Plugin.hydrate(values.baz, baz);
}

export function myAction() {
  console.log(`${foo} ${bar} ${baz ? 'baz' : 'not-baz'}`);
}
