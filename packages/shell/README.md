# @battis/qui-cli.shell

@battis/qui-cli Plugin: Standardized shelljs wrapper

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.shell.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.shell)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.shell @qui-cli/core
```

## Usage

```ts
import { Shell } from '@battis/qui-cli.shell';
import { Core } from '@qui-cli/core';

// configure Shell
Root.configure({ showCommands: true });

// use Shell
Shell.exec('echo "hello world"');
```

## Configuration

```ts
export type Configuration = Plugin.Configuration & {
  showCommands?: boolean;
  silent?: boolean;
};
```

### `showCommands`

Whether or not to display the commands (rather than just their output) in the console, defaults to `false`.

### `silent`

Whether or not to show command output (and, potentially, commands themselves) in the console, defaults to `true`.

## Options

`Shell` exposes both `showCommands` and `silent` as user-configurable command line arguments.

## Initialization

After user-provided command line arguments are parsed, `Shell` is updated to reflect user-specified configuration.

## API

```ts
import { Shell } from '@battis/qui-cli.shell';
```

### `Shell.get()`

Returns the actual [shelljs](https://www.npmjs.com/package/shelljs) object.

### `Shell.exec(command, { silent }): shelljs.ShellString`

Execute an arbitrary `command` in the shell, optionally overriding the current `silent` setting.

### `Shell.getPreviousResult(): shelljs.ShellString`

Get the result of the most-recently executed command.

### `Shell.isSilent(): boolean`

Whether or not the shell is currently set to `silent`.

### `Shell.commandsShown(): boolean`

Whether or not the shell is currently set to `showCommands`.
