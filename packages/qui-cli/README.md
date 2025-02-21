# @battis/qui-cli

Quickly build a CLI app

[![npm version](https://badge.fury.io/js/@battis%2Fqui-cli.svg)](https://badge.fury.io/js/@battis%2Fqui-cli)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Install

```sh
npm install @battis/qui-cli
```

## Usage

```ts
import cli from '@battis/qui-cli';

const args = cli.init({
  opt: {
    example: {
      description: 'An example option'
    }
  }
});

cli.log.debug(args);
```

See [examples](https://github.com/battis/qui-cli/tree/main/examples) for more.

This package is a convenience wrapper for a number of individual, more-focused plugins that can operate individually or in concert to support developing CLI apps. This package combines…

- [@battis/qui-cli.colors](https://www.npmjs.com/package/@battis/qui-cli.colors) (ANSI colors with [Chalk](https://www.npmjs.com/package/chalk)) at `cli.colors`
- [@battis/qui-cli.env](https://www.npmjs.com/package/@battis/qui-cli.env) (.env file management with [dotenv](https://www.npmjs.com/package/dotenv)) at `cli.env`
- [@battis/qui-cli.log](https://www.npmjs.com/package/@battis/qui-cli.log) (logging with [winston](https://www.npmjs.com/package/winston)) at `cli.log`
- [@battis/qui-cli.progress](https://www.npmjs.com/package/@battis/qui-cli.progress) (progress bars with [cli-progress](https://www.npmjs.com/package/cli-progress)) at `cli.progress`
- [@battis/qui-cli.root](https://www.npmjs.com/package/@battis/qui-cli.root) (package root detection with [app-root-path](https://www.npmjs.com/package/app-root-path)) at `cli.root`
- [@battis/qui-cli.shell](https://www.npmjs.com/package/@battis/qui-cli.shell) (shell execution with [shelljs](https://www.npmjs.com/package/shelljs)) at `cli.shell`
- [@battis/qui-cli.validators](https://www.npmjs.com/package/@battis/qui-cli.validators) (validate input from [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts)) at `cli.validators`

…and was written to work in concert with:

- [ora](https://www.npmjs.com/package/ora) (spinners)
- [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts) (CLI input)
