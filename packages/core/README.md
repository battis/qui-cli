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

## Configuration: `configure(config?: Configuration): void`

Programmatic configuration to set defaults before generating user-facing usage documentation or processing user-provided command line arguments.

Invoking `Core.configure()` triggers the `configure()` hook for all registered plugins.

Refer to [@battis/qui-cli.plugin](https://github.com/battis/qui-cli/blob/main/packages/plugin/README.md#configuration) for further details on plugin configuration.

In general, configuration options match those of [jackspeak](https://www.npmjs.com/package/jackspeak#user-content-jackoptions-jackoptions----jack):

```ts
import { JackOptions } from 'jackspeak';

type Configuration = JackOptions & {
  requirePositionals?: boolean | number;
};

function configure(config?: Configuration) {
  // ...
}
```

### `requirePositionals: boolean | number = false`

The one additional option, which complements jackspeak's `allowPositionals` is `requirePositionals`. `requirePositionals` defaults to `false`. If set to `true`, command line arguments that do not include at least one positional will be rejected. If set to a number, exactly that number of command line arguments must be included. Setting `requirePositionals` to a non-`false` value implicitly sets `allowPositionals` to `true`.

## Options: `options(): Options`

Generate command-line options for jackspeak initialization and user-facing usage documentation.

Invoking `Core.options()` merges the `options()` hooks of all registered plugins.

Refer to [@battis/qui-cli.plugin](https://github.com/battis/qui-cli/blob/main/packages/plugin/README.md#options) for further details on plugin options.

The `--help` (`-h`) flag is appended to output user-readable usage information to the command-line.

## Initialization: `init(options?: Options): Arguments`

Initialize the app with user-provided command-line arguments, processed based on the result of `options()`, returning the [processed user-provided command-line arguments from jackspeak](https://www.npmjs.com/package/jackspeak#user-content-jackparseargs-string--processargv--positionals-string-values-optionsresults-).

Invoking `Core.init()` also initializes the `init()` hook for all registered plugins.

Refer to [@battis/qui-cli.plugin](https://github.com/battis/qui-cli/blob/main/packages/plugin/README.md#initialization) for further details on plugin initialization.

Additional app-specific command-line options can be provided with an `Options` object as described in [@battis/qui-cli.plugin](https://github.com/battis/qui-cli/blob/main/packages/plugin/README.md#options).
