# @qui-cli/qui-cli

A collection of packages for rapidly developing command line applications

- [@qui-cli/qui-cli](./packages/qui-cli/): bundled core functionality (colors, env, log, progress, root, shell, validators). Works well with [ora](https://www.npmjs.com/package/ora) and [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts).

Alternatively, individual packages can be selected and used in a more parsimonious, light-weight, modular manner:

{{TOC}}

If using the modular approach, plugin definitions are managed by [@qui-cli/plugin](./packages/plugin/) and core functionality resides in [@qui-cli/core](./packages/core/)

[Examples of usage and development approaches are available.](./examples#readme)
