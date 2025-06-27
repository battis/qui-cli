# @battis/qui-cli.core

Core features of @battis/qui-cli

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.core.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.core)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.core
```

## Usage

```ts
import { Core } from '@battis/qui-cli.core';

// process user-provided command-line arguments
const args = Core.init();

// use Colors
console.log(
  `This is a ${Colors.value('value')} and a ${Colors.quotedValue('"quoted value"')}.`
);
```

## Core Plugins

Three core plugins are registered automatically to provide consistent functionality.

### `jackspeak`

Manages any custom [jackspeak](https://www.npmjs.com/package/jackspeak#user-content-jackoptions-jackoptions----jack) options. As with any other plugin, it can be configured via `Core.configure()`:

```ts
await Core.configure({
  jackspeak: {
    envPrefix: 'MY_APP'
  }
});
```

### `positionals`

Provides per-plugin positonal argument management and documentation. Individual plugins can require named positional arguments, which are collected and documented by `usage()` and accessible throgh the `Positionals` plugin.

```ts
import { Core, Positionals } from '@battis/qui-cli.core';

Positionals.require({
  my_number: {
    description: 'How far left to move',
    validate: (v?: string) => !isNaN(v) || 'my_number must be a numeric value'
  }
});

await Core.run();

console.log(Positionals.get('my_number'));
```

Positional arguments are processed in the order in which plugins are registered. Thus, if plugin A requires positional arguments `a1` and `a2`, plugn B requires positional arguments `b1` and `b2` and depends on plugin C which requires positional argument `c1`, the resulting positional argument order would be: `a1 a2 c1 b1 b2`.

Unnamed arguments can also be required, however this is a dicey proposition to implement within a plugin and is likely best reserved for independent apps that consume plugins, as the `min` and `max` number of positional arguments check against the currently registered list of required named positonal arguments for validity (as well as their own respective values). In general, configuring unnamed positional arguments is best done before any required named positional arguments are defined.

```ts
// require at least 2 and no more than 5 unnamed positionals:
//   arg0 arg1 [arg2 arg3 arg4]
Positionals.configure({ min: 2, max: 5 });

//.  nemo arg0 arg1 [arg2 arg3 arg4]
Positionals.require({ nemo: { description: 'I have a name!' } });

// fails: nemo is required, must be at least 1
Positionals.setMinArg(0);

// succeeds
Positionals.setMinArg(6);

// fails: is less than current min
Positionals.setMaxArg(4);
```

### `help`

Provides consistent `--help` (`-h`) flag for all commands that displays usage. No confiuration.

## Configuration: `configure(config?: Configuration): void`

Programmatic configuration to set defaults before generating user-facing usage documentation or processing user-provided command line arguments.

Invoking `Core.configure()` triggers the `configure()` hook for all registered plugins.

Refer to [@battis/qui-cli.plugin](https://www.npmjs.com/package/@battis/qui-cli.plugin#user-content-configuration) for further details on plugin configuration.

## Options: `options(): Options`

Generate command-line options for jackspeak initialization and user-facing usage documentation.

Invoking `Core.options()` merges the `options()` hooks of all registered plugins.

Refer to [@battis/qui-cli.plugin](https://www.npmjs.com/package/@battis/qui-cli.plugin#user-content-options) for further details on plugin options.

The `--help` (`-h`) flag is appended to output user-readable usage information to the command-line.

## Initialization: `init(options?: Options): Arguments`

Initialize the app with user-provided command-line arguments, processed based on the result of `options()`, returning the [processed user-provided command-line arguments from jackspeak](https://www.npmjs.com/package/jackspeak#user-content-jackparseargs-string--processargv--positionals-string-values-optionsresults-).

Invoking `Core.init()` also initializes the `init()` hook for all registered plugins.

Refer to [@battis/qui-cli.plugin](https://www.npmjs.com/package/@battis/qui-cli.plugin#user-content-initialization) for further details on plugin initialization.

Additional app-specific command-line options can be provided with an `Options` object as described in [@battis/qui-cli.plugin](https://www.npmjs.com/package/@battis/qui-cli.plugin#user-content-options).
