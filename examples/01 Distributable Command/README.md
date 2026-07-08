# @examples/distributable-command

An example of a @qui-cli command that can be distributed as a Node package

[![npm version](https://badge.fury.io/js/@examples%2fdistributable-command.svg)](https://npmjs.com/package/@examples/distributable-command)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://nodejs.org/api/esm.html)

## Create from template

This package is created using the @qui-cli/command template and making a few quick edits:

```sh
> pnpm create @qui-cli/command --scope examples "Distributable Command" --description "An example of a @qui-cli command that can be distributed as an Node package"
```

## Consistent Usage

The command itself is distributed in the module's [bin](./bin/) directory (as indicated in [package.json](./package.json#L16-L18)) as Node executable. It can be invoked either by installing the package globally (and adding the global package manager's bin directory to your path, as one does) or by invoking you favorite package manager's exec function:

```sh
> pnpm exec distributable-command
```

The command is self-documenting, and its usage can be invoked with `--help` (or `-h`):

```sh
> ./bin/distributable-command -h
Usage:
  distributable-command -hf --t=<"argle bargle"> --number=<3.14159> --logFilePath=<logFilePath> --stdoutLevel=<all|trace|debug|info|warning|error|fatal|off>
  --fileLevel=<all|trace|debug|info|warning|error|fatal|off> [target]

Positional arguments

  target

    A positional text argument

  -h --help  Show this usage information

Command Options

  -t<"argle bargle"> --text=<"argle bargle">
             A text parameter

  --number=<3.14159>
             A numeric parameter (Default: 2.171)
  -f --flag  A boolean parameter

Logging options

  --logFilePath=<logFilePath>
             Path to log file (optional)

  --stdoutLevel=<all|trace|debug|info|warning|error|fatal|off>
             Log level to console stdout (Default: "info")

  --fileLevel=<all|trace|debug|info|warning|error|fatal|off>
             Log level to log file if --logFilePath provided (Default: "all")
```

## Easy development

All of the API hooks that are defined in the [example](./src/DistributableCommand.ts) are optional (with the exception of the plugin [name](./src/DistributableCommand.ts#30-L31)). The hooks are documented in detail in the [@qui-cli/plugin](https://www.npmjs.com/package/@qui-cli/plugin) module.

In combination with [@qui-cli/core](https://www.npmjs.com/package/@qui-cli/core), the plugin can be [registered an the Core invoked](./src/index.ts).
