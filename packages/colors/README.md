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

## API: `console.log` styles

### `value(text)`

A literal value (e.g. `3` or `true`);

### `quotedValue(text)`

A quoted value (e.g. `"hello world"`). Quotation marks should be included in the `text` argument.

### `regexpValue(text)`

A regular expression value (e/g `/.+/`). Expression delimiters (`/`) should be included in the `text` argument.

### `url(text)`

A URL value (e.g. `https://example.com` or `./path/to/file`).

### `path(text, higlight = (v) => v)`

A file or URL path (e.g. `../../path/to/file`).

Highlight the filename by passing a second argument:

```ts
Colors.path('path/to/filename', Colors.value);
```

> <code style="color:skyblue">path/to/<span style="color:yellow">filename</span></code>

### `error(text)`

An error message (e.g. `Bad things happened!`).

## API: Node styles

### `command(text)`

A shell command (e.g. `echo "hello world"`).

Highlight the command name by passing a second argument:

```ts
Colors.command('echo hello world', Colors.keyword);
```

> <code style="color:magenta"><b>echo</b> hello world</code>

### `keyword(text)`

A keyword (e.g. a shell command), as in:

```ts
console.log(Colors.command(`${Colors.keyword('echo')} "hello world"`));
```

## API: man page styles

### `optionArg(text)`

The name of an option argument (e.g. `--my-fancy-option`), as in:

```ts
console.log(
  `${Colors.optionArg('--my-fancy-option')} ${Colors.quotedValue('"pinkies out"')}`
);
```

### `flagArg(text)`

The name of a flag argument (e.g. `--no-errors-please`).

### `positionalArg(text)`

The name of a positional argument (e.g. `arg0`).
