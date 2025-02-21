# @battis/qui-cli.root

@battis/qui-cli Plugin: Identify the root of the current application

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.root.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.root)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.root
```

## Usage

```ts
import { Root } from '@battis/qui-cli.root';
import path from 'node:path';

// configure Root
Root.configure({ root: path.resolve(import.meta.dirname, '../../..') });

// use Root
console.log(Root.path());
```

## Configuration

```ts
export type Configuration = Plugin.Configuration & {
  root?: string;
  cwd?: string | boolean;
};
```

### `root`

Specify the desired root to use as a base for relative paths in your application. Can be relative to the package root, or an absolute path. If undefined, defaults to the root of the package.

**CAUTION:** When working in a monorepo, the package root will be inferred as the root of the monorepo itself, and not the root of the package within which you are working.

### `cwd`

Specify whether to also set `root` as the current working directory. If `true`, use `root` as the `process.cwd()`, if `cwd` is a path, it is resolved relative to `root`.

## Options

`Root` adds no user-configurable command line options.

## Initialization

`Root` requires no initialization

## API

```ts
import { Root } from '@battis/qui-cli.root';
```

### `Root.path(): string`

Get the currently defined root path.
