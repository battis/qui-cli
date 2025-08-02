# Example: Re-usable Plugin

Define (and use) a plugin package

## Notes

### [plugin-provider](./plugin-provider/)

Defines a reusable plugin package

- [src/MyPlugin.ts](./plugin-provider/src/MyPlugin.ts) defines a reusable plugin. See [@qui-cli/plugin](../../packages/plugin/README.md#usage) for plugin documentation.
- [src/index.ts](./plugin-provider/src/index.ts) registers and exports the plugin for re-use.
- [package.json](./plugin-provider/package.json) defines its dependency on another plugin ([@battis/qui-cli.log](../../packages/log/)) as a peer with a more lenient version descriptor than the dev dependency that is used for local development, trusting semantic versioning. Peering assures that this plugin and its dependencies will be hoisted to the same level when imported into other projects.

## Consumers

[plugin-consumer-cli](./plugin-consumer-cli/) and [plugin-consumer-modular](./plugin-consumer-modular/) are equivalent and demonstrate the two possible approaches to consuming re-usable plugins.

### [plugin-consumer-cli](./plugin-consumer-cli/)

Consumes a plugin package using the CLI package.

- [src/index.ts](./plugin-consumer-cli/src/index.ts) imports the plugin and initializes and runs the CLI package (not every plugin provides a `run()` method, althogh `MyPlugin` does -- e.g. `@battis/qui-cli.log` does not). It also makes use of the provided module for its own business logic (as `MyPlugin` does with its import of `@battis/qui-cli.log`).

### [plugin-consumer-modular](./plugin-consumer-modular/)

Consume a plugin package using the modular model.

- [src/index.ts](./plugin-consumer-modular/src/index.ts) behaves much the same as in the CLI approach, but note that instead [@qui-cli/core](../../packages/core/) is initialized and run.
