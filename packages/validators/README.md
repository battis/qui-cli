# @qui-cli/validators

@qui-cli Plugin: Input validators

[![npm version](https://badge.fury.io/js/@qui-cli%2Fvalidators.svg)](https://npmjs.com/package/@qui-cli/validators)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Deprecated in favor of [zod](https://www.npmjs.com/package/zod)

Validators were originally designed to slot into [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts) transparently, with meaningful error messages.

```ts
import { Validators } from '@qui-cli/validators';
import { input } from '@inquirer/prompts';

const result = await input({
  message: 'Enter a value',
  validator: Validators.nonEmpty
});
```

zod handles this nicely, without needing to support an extra package:

```ts
import z from 'zod';
import {input} from '@inquirer/prompts';

const result = await input({
  message: 'Enter a value',
  validator (value?: string) => {
    const { success, error: { issues } } = z.string().nonempty().safeParse(value);
    return success ||
      issues.map(i => i.message).join(', ');
  }
});
```

or, less verbosely…

```ts
import z from 'zod';
import { input } from '@inquirer/prompts';

const result = await input({
  message: 'Enter a value',
  validator: (value?: string) =>
    z.string().nonempty().safeParse(value).success || 'error message'
});
```

<table>
<thead>
<tr><th>@qui-cli/validators</th><th>zod</th></tr>
<thead>
<tbody>
<tr><td>

`Validators.notEmpty()`</td><td>`z.string().nonempty()`</td></tr>
<tr><td>

`Validators.minLength(m)`</td><td>`z.string().min(m)`</td></tr>
<tr><td>

`Validators.maxLength(m)`</td><td>`z.string().max(m)`</td></tr>
<tr><td>

`Validators.lengthBetween(m,n)`</td><td>`z.string().min(m).max(n)`</td></tr>
<tr><td>

`Validators.match(r)`</td><td>`z.string().regex(r)`</td></tr>
<tr><td>

`Validators.cron()`</td><td>

```ts
import cron from 'cron-validate';

z.stringFormat('cron', (val?: string) => !!val && cron(val).isValid())`
```

</td></tr>
<tr><td>

`Validators.isPath()`</td><td>

```ts
import path from 'node:path';

z.stringFormat(
  'posix-path',
  (val?: string) => !!val && val == path.posix.normalize(val)
);
```

</td></tr>
<tr><td>

`Validators.isHostname()`</td><td>`z.string().hostname()`</td></tr>
</tbody>
</table>

## Install

```sh
npm install @qui-cli/validators @qui-cli/core @inquirer/prompts
```

If developing a reusable plugin:

```sh
npm install --save-peer  @qui-cli/validators@>=3
```

## Usage

```ts
import { Core } from '@qui-cli/core';
import { Validators } from '@qui-cli/validators';
import { input } from '@inquirer/prompts'

// load user-provided command-line arguments
await Core.run();

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
import { Validators } from '@qui-cli/validators';
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
