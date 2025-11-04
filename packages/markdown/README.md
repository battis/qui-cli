# @qui-cli/log

@qui-cli Plugin: Export usage as markdown

[![npm version](https://badge.fury.io/js/@qui-cli%2Fmarkdown.svg)](https://npmjs.com/package/@qui-cli/markdown)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @qui-cli/markdown @qui-cli/core
```

## Usage

See [example](https://github.com/battis/qui-cli/tree/main/examples/dev-readme).

## Configuration

```ts
export type Configuration = Plugin.Configuration & {
  outputPath?: string;
  fileName?: string;
  pre?: string;
  post?: string;
  overwrite?: boolean;
};
```

### `outputPath`

Path to which to write Markdown output file. If the path does not exist, it will be created. If the path does not have a file extension, it will be assumed to be a directory path (unless it exists as a file), see [`fileName`](#fileName).

### `fileName`

Filename to use for output if `outputPath` is a path to a directory. Default: `"usage.md"`.

### `pre`

Any Markdown text to prepend to the output.

### `post`

Any Markdown text to append to the output.

### `overwrite`

Whether or not to overwrite an existing file with output. Default: `false`
