# @battis/qui-cli.log

@battis/qui-cli Plugin: Standardized winston wrapper

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.log.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.log)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.log @qui-cli/core
```

## Usage

```ts
import { Log } from '@battis/qui-cli.env';
import { Core } from '@qui-cli/core';

// process user-provided command-line arguments
const args = Core.init();

// use Log
Log.debug(args);
```

## Configuration

```ts
export type Configuration = Plugin.Configuration & {
  logFilePath?: string;
  stdoutLevel?: string;
  fileLevel?: string;
  levels?: CustomLevels;
  root?: string;
};
```

### `logFilePath`

Optional path to log file (relative to `root`).

### `stdoutLevel`

Log level to display via stdout/console, defaults to `'info'`;

### `fileLevel`

Log level to write to log file (if `logFilePath` defined), defaults to `'all'`;

### `levels`

Custom log levels to use, specified by `Log.CustomLevels`

### `root`

Optional root to use as the base for relative `logFilePath`. If undefined, falls back to the path defined by [@battis/qui-cli.root](https://www.npmjs.com/package/@battis/qui-cli.root).

## Options

Exposes `logFilePath`, `stdoutLevel`, and `fileLevel` to user-provided command line arguments.

## Initialization

`Log` will updating logging settings after user-provided command line arguments are parsed. If `stdoutLevel` is set to `off`, logging to the console will be disabled. If `configure()` has provided a `logFilePath` value previously and the user provides an additional `logFilePath`, logs will be written to both paths.

## API

```ts
import { Log } from '@battis/qui-cli.log';
```

### `Log.get(): winston.Logger`

Get the actual winston logger object.

### `Log.log()`

Directly invoke the winston [`log()` method](https://www.npmjs.com/package/winston#user-content-usage)

### `Log.trace()`, `Log.debug()`, `Log.info()`, `Log.warning()`, `Log.error()`, `Log.fatal()`

Log a string or object (to be stringified -- in color in the console) at the respective log level.
