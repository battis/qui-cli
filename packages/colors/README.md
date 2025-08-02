# @qui-cli/colors

@qui-cli Plugin: Standardized Chalk colors for CLI output

[![npm version](https://badge.fury.io/js/@qui-cli%2Fcolors.svg)](https://npmjs.com/package/@qui-cli/colors)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @qui-cli/colors
```

## Usage

```ts
import { Colors } from '@qui-cli/colors';

// use Colors
console.log(
  `This is a ${Colors.value('value')} and a ${Colors.quotedValue('"quoted value"')}.`
);
```

## Configuration

`Colors` provides no configuration options.

## Options

`Colors` adds no user-configurable command line options.

## Initialization

`Colors` requires no initialization

## API

### `value(text)`

A literal value (e.g. `3` or `true`);

### `quotedValue(text)`

A quoted value (e.g. `"hello world"`). Quotation marks should be included in the `text` argument.

### `regexpValue(text)`

A regular expression value (e/g `/.*/`). Expression delimiters (`/`) should be included in the `text` argument.

### `url(text)`

A URL value (e.g. `https://example.com` or `./path/to/file`).

### `error(text)`

An error message (e.g. `Bad things happened!`).

### `command(text)`

A shell command (e.g. `echo "hello world"`).

### `keyword(text)`

A keyword (e.g. a shell command), as in:

```ts
console.log(Colors.command(`${Colors.keyword('echo')} "hello world"`));
```
