# @battis/qui-cli.plugin

@battis/qui-cli plugin structure and registrar

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.plugin.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.plugin)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.plugin
```

## Usage

Refer to [@battis/qui-cli.env](../env) for a complete example defining a plugin. The model is to define an ESM module and then to register that module with the `Plugin.Registrar`. The plugin module can optionally define the following hooks:

- `configure(config?: Plugin.Configuration) => void` may be invoked either manually before processing user-provided command line arguments (e.g. to update default values) and also (if defined) when `options()` is invoked. See [Configuration](#Configuration) below.
- `options() => Plugin.Options` is invoked (if defined) when preparing to process user-provided command-line arguments and must return a `Plugin.Options` object describing any user-configurable command line arguments and other user-readable documentation. See [Options](#Options) below.
- `init(args: Plugin.Arguments<ReturnType<typeof options>>) => void` is invoked to process any user-provided command line arguments. See [Initialization](#Initialization) below.

### Recommended Plugin Structure

Refer to [@battis/qui-cli.shell](https://github.com/battis/qui-cli/tree/main/packages/shell) for a relatively straight-forward example.

```
📁 @example/plugin
 ↳ package.json
 ↳ 📁 src
    ↳ index.ts
    ↳ Example.ts
```

#### `package.json`

Define both a name and version. Include `@battis/qui-cli.plugin` and any other plugins that your Plugin depends on as peer dependencies:

```json
{
  "name": "@example/plugin",
  "version": "1.2.3",
  "peerDependencies": {
    "@battis/qui-cli.plugin": "^0.1"
  }
}
```

#### `src/index.ts`

Register your plugin with the `Plugin.Registrar` and export the module for the convenience of other plugins that may depend on it.

```ts
import { register } from '@battis/qui-cli.plugin';
import * as Example from './Example.js';

await register(Example);
export { Example };
```

#### `src/Example.ts`

Define your plugin module, including exported `name` and `src` values and any of the optional [Plugin Hooks](#Plugin-Hooks).

```ts
export const name = 'example';
export const src = import.meta.dirname;

export function configure(config?) {
  // ...
}

export function myMethod() {
  // ...
}
```

## Plugin Hooks

### Configuration

The `configure()` hook may prepare the plugin module for use.

While the provided `Plugin.Configuration` type can be used as the parameter type for the `configure()` hook, it is recommended to extend that configuration to support IntelliSense in your IDE:

```ts
type Configuration = Plugin.Configuration & {
  myOption?: string;
};
```

All plugin-defined configuration parameters _must_ be optional, as the `configure()` hook may be invoked with no parameters to ensure that a plugin is ready to to provide `options()` or receive `init()`.

In general, it is recommended that `configure()` be used to set/update/instantiate any module variables that are used elsewhere, and can be understood as the constructor for the singleton object represented by the plugin module.

### Options

The `options()` hook may provide command-line options for [jackspeak](https://www.npmjs.com/package/jackspeak#user-content-option-definitions) initialization and user-facing usage documentation.

```ts
type ConfigSet<Value> = Record<
  string,
  {
    description?: string; // user-readable usage information
    short?: string; // single-character short-hand for this option
    default?: Value;
    hint?: string
    validate?: (value: any) => v is Value | (v: any) => boolean;
    type?: 'number' | 'string' | 'boolean';
    multiple?: boolean;
    delim?: string // default ' '
  }
>;

type Paragraph = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  pre?: boolean;
};

type Options = {
  // an option that expects a single number
  num?: ConfigSet<number>;

  // an option that expects a `delim`-separated list of numbers
  numList?: ConfigSet<number[]>;

  // an option that expects a string value (optionally quoted)
  opt?: ConfigSet<string>;

  // an option that expects a `delim`-separated list of strings
  optList?: ConfigSet<string[]>;

  // a flag that is set (true) or unset (false), --example can be explicitly unset as --no-example
  flag?: ConfigSet<boolean>;

  // a flag that can be set multiple times (-d vs -ddd)
  flagList?: ConfigSet<boolean[]>;

  // must explicitly define type and multiple
  fields?: ConfigSet<any>;

  // additional user-readable usage information
  man?: Paragraph[];
};
```

For example, the `options()` hook could be defined thus:

```ts
export function options() {
  return {
    flag: {
      foo: {
        description: 'Engage foo-ness',
        short: 'f'
      }
    },
    opt: {
      bar: {
        description: `Bar value (default: "argle-bargle")`,
        short: 'b',
        default: 'argle-bargle'
      }
    }
  };
}
```

### Initialization

The `init()` hook may receive user-provided command line arguments to update the plugin configuration. The arguments are provided as the result of the [jackspeak parse() method](https://www.npmjs.com/package/jackspeak#user-content-jackparseargs-string--processargv--positionals-string-values-optionsresults-).

The arguments may be assumed to reflect that `Plugin.Options` object returned from the `options()` hook (if no `options()` hook is defined, it is recommended to examine only the positional arguments).

```ts
export function init({
  values: { foo, bar }
}: Plugin.Arguments<ReturnType<typeof options>>) {
  // ...
}
```

## API

```ts
import * as Plugin from '@battis/qui-cli.pugin';
```

### `Plugin.register(plugin): void`

Register a plugin for use.

```ts
import * as MyPlugin from './MyPlugin.js';

Plugin.register(MyPlugin);
```

### `Plugin.Configuration`

Typing for `configure()` hook. Intended to be extended to provide IntelliSense support, discussed in detail in [Configuration](#Configuration).

```ts
type Configuration = Plugin.Configuration & {
  // ...
};

export function configure(config?: Configuration) {
  // ...
}
```

### `Plugin.Options`

Typing for `options()` hook. Maps 1:1 to the [jackspeak options API](https://www.npmjs.com/package/jackspeak#user-content-option-definitions), discussed in detail in[Options](#Options).

```ts
export function options(): Plugin.Options {
  // ...
}
```

### `Plugin.Arguments`

Typing for `init()` hook. Intended to provide IntelliSense support for parameters defined by `options()` hook.

```ts
export function init(args: Plugin.Arguments<ReturnType<typeof options>>) {
  // ...
}
```

### `Plugin.Registrar`

The Plugin Registrar, responsible for tracking plugin registrations and triggering plugin hooks. Intended primarily for use by [@battis/qui-cli.core](https://www.npmjs.com/package/@battis/qui-cli.core)

### `Plugin.mergeOptions(a, b): Plugin.Options`

Merge two `Plugin.Options` objects. `b` overwrites `a` in the event of duplicate keys.
