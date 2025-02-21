# @battis/qui-cli.progress

@battis/qui-cli Plugin: Progress bar for CLI app

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.progress.svg)](https://badge.fury.io/js/@battis%2Fqui-cli.progress)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli.progress
```

## Usage

```ts
import { Progress } from '@battis/qui-cli.progress';

Progress.start({ max: 10 });
for (let i = 0; i < 10; i++) {
  // do a thing
  Progress.increment();
  Progess.caption(`Step ${i}`);
}
Progress.stop();
```

## Configuration

`Progress` provides no configuration options.

## Options

`Progress` adds no user-configurable command line options.

## Initialization

`Progress` requires no initialization

## API

```ts
import { Progress } from '@battis/qui-cli.progress';
```

### `Progress.start({value?, max}): void`

Start a progress bar with `max` steps at `value` position (if undefined, `value` is 0).

### `Progress.increment(): void`

Increment the progress bar one step.

### `Progress.caption(text): void`

Update the caption on the progress bar.

### `Progress.stop()`

Stop the progress bar.

**CAUTION** The progress bar must be stopped for the process to end. If it is not ended, it will run indefinitely.
