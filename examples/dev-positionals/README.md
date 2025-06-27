# Example: Command

A distributable command-line app

# Notes

- [Command.ts](./src/Command.ts) is a plugin that defines the command. See [@battis/qui-cli.plugin](../../packages/plugin/README.md#usage) for plugin documentation.
- [index.ts](./src/index.ts) registers the `Command` plugin and run the app.
- [package.json](./package.json) `bin` points to compiled script
