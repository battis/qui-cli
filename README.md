# @battis/qui-cli

A collection of packages for rapidly developing command line applications

- [@battis/qui-cli](./packages/qui-cli/): bundled core functionality (colors, env, log, progress, root, shell, validators). Works well with [ora](https://www.npmjs.com/package/ora) and [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts).

Alternatively, individual packages can be selected and used in a more parsimonious, light-weight, modular manner:

- [@battis/qui-cli.colors](./packages/colors/): ANSI colors with [Chalk](https://www.npmjs.com/package/chalk)
- [@battis/qui-cli.env](./packages/env/): .env file management with [dotenv](https://www.npmjs.com/package/dotenv)
- [@battis/qui-cli.log](./packages/log/): Logging with [winston](https://www.npmjs.com/package/winston)
- [@battis/qui-cli.progress](./packages/progress/): Progress bars with [cli-progress](https://www.npmjs.com/package/cli-progress)
- [@battis/qui-cli.root](./packages/root/): Package root detection with [app-root-path](https://www.npmjs.com/package/app-root-path)
- [@battis/qui-cli.shell](./packages/shell/): Shell execution with [shelljs](https://www.npmjs.com/package/shelljs))
- [@battis/qui-cli.structured](./packages/structured/): Build a structured command from directory contents
- [@battis/qui-cli.validators](./packages/validators/): Validate input from [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts)

If using the modular approach, plugin definitions are managed by [@battis/qui-cli.plugin](./packages/plugin/) and core functionality resides in [@battis/qui-cli.core](./packages/core/)

[Examples of usage and development approaches are available.](./examples/)
