# @qui-cli/env

@qui-cli Plugin: Standardized environment configuration

[![npm version](https://badge.fury.io/js/@qui-cli%2Fenv.svg)](https://npmjs.com/package/@qui-cli/env)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @qui-cli/env
```

## Usage

```ts
import { Env } from '@qui-cli/env';

// configure desired environment path
Env.configure({ path: '../../.env' });

// update .env
Env.set({ key: 'EXAMPLE', value: parseInt(process.env.EXAMPLE || '0') + 1 });
```

### When are environment variables ready to be read?

Environment variables (from any `.env` file loaded by this plugin) are not available until after the `Env.parse()` has been called, which is not guaranteed to have occurred unless invoked directly by another plugin or _after_ the plugin has been initializied by `init()` (see [dev-plugin-lifecycle](https://github.com/battis/qui-cli/tree/main/examples/dev-plugin-lifecycle#readme) for an illustration of this).

Any plugin that depends on this plugin can assume that the `.env` file environemnt variables are available in the dependent plugin's `init()` and `run()` methods, but will **not** be available in the dependent plugin's `options()` method and will only **sometimes** be available in the dependent plugin's `configure()` method (when it is invoked by `init()`, for example).

### 1Password integration

To access 1Password secret references stored in the environment, install the optional peer dependency [@1password/sdk](https://www.npmjs.com/package/@1password/sdk). For full integration, also install the [1Password CLI](https://developer.1password.com/docs/cli/) which will allow you to look up a [1Password service account](https://developer.1password.com/docs/service-accounts/security/) token by identifier.

The configuration options `opToken`, `opItem`, and `opAccount` may all be passed as command-line options. For example:

```sh
example --opToken "$(op item get ServiceAccountToken)"
```

If the [1Password CLI tool](https://developer.1password.com/docs/cli) is installed, then `opItem` and `opAccount` can be used:

```sh
example --opAccount example.1password.com --opitem "My Token Identifier"
```

## Configuration

```ts
export type Configuration = Plugin.Configuration & {
  root?: string;
  load?: boolean;
  path?: string;
};
```

### `root`

Optional root for calculating relative paths to `.env` files. If undefined, falls back to the path defined by [@qui-cli/root](https://www.npmjs.com/package/@qui-cli/root).

### `load`

Whether or not to load the `.env` file into `process.env` immediately. Defaults to `true`.

### `path`

Path to desired `.env` file relative to `root`. Defaults to `'.env'`;

### 1Password configuration

If 1Password secret references are stored in the environment, a 1Password service account token is required to access the secret values.

#### `opToken`

1Password service account token; will use environment variable `OP_TOKEN` if present

#### `opItem`

Name or ID of the 1Password API Credential item storing the 1Password service account token; will use environment variable `OP_ITEM` if present. Requires the [1Password CLI tool](https://developer.1password.com/docs/cli).

#### `opAccount`

1Password account to use (if signed into multiple); will use environment variable `OP_ACCOUNT` if present

## Options

When the optional peer dependency [@1password/sdk](https://www.npmjs.com/package/@1password/sdk) is installed, `Env` exposes `opAccount`, `opItem`, and `opToken` as command-line options.

## Initialization

`Env` loads the specified `.env` file into `process.env`.

## API

```ts
import { Env } from '@qui-cli/env';
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
