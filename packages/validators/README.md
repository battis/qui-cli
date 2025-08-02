# @qui-cli/progress

@battis/qui-cli Plugin: Input validators

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.validators.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.validators)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.validators @inquirer/prompts
```

## Usage

```ts
import { Validators } from '@battis/qui-cli.validators';
import { input } from '@inquirer/prompts'

const word = await input({
  message: 'Enter a decently long word'
  default: 'quetzlcoatl',
  validate: Validators.lengthBetween(8, 100)
})
```

## Configuration

`Validators` provides no configuration options.

## Options

`Validators` adds no user-configurable command line options.

## Initialization

`Validators` requires no initialization

## API

```ts
import { Validators } from '@battis/qui-cli.validators';
```

### `Validators.notEmpty(value?): boolean | string`

Require a non-empty string. Returns `true` if valid, an error message if invalid.

### `Validators.minLength(minLength): Validator`

Returns a validator that requires a string of at least `minLength`.

### `Validators.maxLength(maxLength): Validator`

Returns a validator that requires a string of no more than `maxLength`.

### `Validators.lengthBetween(min, max): Validator`

Returns a validator that requires a string between `min` and `max` characters.

### `Validators.match(regExp): Validator`

Returns a validator that requires a string that matches `regExp`.

### `Validators.email(): Validator`

Returns a validator that requires a valid email address.

### `Validators.cron(value?): boolean | string`

Requires a valid cron schedule string. Returns `true` if valid, an error message if invalid.

### `Validators.isHostname(): Validator`

Returns a validator that requires a valid hostname.

### `Validators.isPath(value?): boolean | string`

Require a file path string. Returns `true` if valid, an error message if invalid.

### `Validators.pathExists(root?): Validator`

Returns a validator that requires a file path string that exists (relative to `root`, if `root` is undefined, falls back to [Root.path()](https://www.npmjs.com/package/@qui-cli/root)).

### `Validators.combine(...validators: Validator[]): Validator`

Returns a validator that combines any number of other validators (all must be met to valididate, first validator to fail returns an error message).
