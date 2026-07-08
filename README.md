# @qui-cli/qui-cli

A collection of packages for rapidly developing command line applications

- [@qui-cli/qui-cli](./packages/qui-cli/): bundled core functionality (colors, env, log, progress, root, shell, validators). Works well with [ora](https://www.npmjs.com/package/ora) and [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts).

Alternatively, individual packages can be selected and used in a more parsimonious, light-weight, modular manner:

## packages

### [@qui-cli/colors](./colors/README.md)

@qui-cli Plugin: Standardized Chalk colors for CLI output

### [@qui-cli/core](./core/README.md)

Core features of @qui-cli/qui-cli

### [@qui-cli/env](./env/README.md)

@qui-cli Plugin: Standardized environment configuration

### [@qui-cli/log](./log/README.md)

@qui-cli Plugin: Standardized winston wrapper

### [@qui-cli/markdown](./markdown/README.md)

@qui-cli Plugin: Export usage as markdown

### [@qui-cli/plugin](./plugin/README.md)

@qui-cli plugin structure and registrar

### [@qui-cli/progress](./progress/README.md)

@qui-cli Plugin: Progress bar for CLI app

### [@qui-cli/qui-cli](./qui-cli/README.md)

Quickly build a CLI app

### [@qui-cli/root](./root/README.md)

@qui-cli Plugin: Identify the root of the current application

### [@qui-cli/shell](./shell/README.md)

@qui-cli Plugin: Standardized shelljs wrapper

### [@qui-cli/structured](./structured/README.md)

Build a structured @qui-cli command from directory contents

### [@qui-cli/validators](./validators/README.md)

@qui-cli Plugin: Input validators

If using the modular approach, plugin definitions are managed by [@qui-cli/plugin](./packages/plugin/) and core functionality resides in [@qui-cli/core](./packages/core/)

[Examples of usage and development approaches are available.](./examples#readme)
