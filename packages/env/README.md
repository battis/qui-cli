# @battis/qui-cli.env

@battis/qui-cli Plugin: Standardized environment configuration

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.env.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.env)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.env
```

## Usage

```ts
import { Env } from '@battis/qui-cli.env';

// configure desired environment path
Env.configure({ path: '../../.env' });

// update .env
Env.set({ key: 'EXAMPLE', value: parseInt(process.env.EXAMPLE || '0') + 1 });
```

### When are environment variables ready to be read?

Environment variables (from any `.env` file loaded by this plugin) are not available until after the `Env.configure()` has been called, which is not guaranteed to have occurred unless invoked directly by another plugin or _after_ the plugin has been initializied by `init()`. Any plugin that depends on this plugin can assume that the `.env` file environemnt variables are available in the dependent plugin's `init()` and `run()` methods, but will **not** be available in the dependent plugin's `options()` method and will only **sometimes** be available in the dependent plugin's `configure()` method.

## Configuration

```ts
export type Configuration = Plugin.Configuration & {
  root?: string;
  load?: boolean;
  path?: string;
};
```

### `root`

Optional root for calculating relative paths to `.env` files. If undefined, falls back to the path defined by [@battis/qui-cli.root](https://www.npmjs.com/package/@battis/qui-cli.root).

### `load`

Whether or not to load the `.env` file into `process.env` immediately. Defaults to `true`.

### `path`

Path to desired `.env` file relative to `root`. Defaults to `'.env'`;

## Options

`Env` adds no user-configurable command line options.

## Initialization

`Env` requires no initialization

## API

```ts
import { Env } from '@battis/qui-cli.env';
```

### `Env.parse(file?)`

Parse `file` (path relative to `root`, defaults to `path` if `file` is not defined) as a `.env` file and append to `process.env`. Passing `load` as `true` to `configure()` calls this immediately from `configure()`.

### `Env.exists({key, file?}): boolean`

Determine if a particular `key` exists in the specified `.env` `file` (defaults `path` if `file` is not defined).

### `Env.get({key, file?}): string | undefined`

Get the string value (if present) of a particular key in a `.env` file (defaults to `path` if `file` is not defined). Returns `undefined` if the key is not present.

### `Env.set({key, value, comment?, file?}): void`

Set the value of a particular `key` in the specified `.env` `file` (defaults to `path` if `file` is not defined). Optional `comment` can be inserted preceding the `key` in the `file`.

### `Env.remove({key, comment?, file?)`

Remove a particular `key` from the specified `.env` `file` (defaults to `path` if `file` os not defined), optionally replacing the `key` with a `comment`.
