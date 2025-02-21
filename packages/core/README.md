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

The `--help` (`-h`) flag is appended to output user-readable usage information to the command-line.

## Initialization: `init(options?: Options): Arguments`

Initialize the app with user-provided command-line arguments, processed based on the result of `options()`, returning the [processed user-provided command-line arguments from jackspeak](https://www.npmjs.com/package/jackspeak#user-content-jackparseargs-string--processargv--positionals-string-values-optionsresults-).

Invoking `Core.init()` also initializes the `init()` hook for all registered plugins.

Additional app-specific command-line options can be provided with an `Options` object:

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

### Example `init()` invocation

```ts
import { Core } from '@battis/qui-cli.core';

const {
  values: { foo, bar },
  positionals: [arg0, arg1]
} = Core.init({
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
});

if (foo) {
  console.log(`${arg0} to the ${bar} of ${arg1}`);
}
```
