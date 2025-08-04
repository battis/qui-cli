# Example: Fallback Env Implementation

Fallback to default Env implementation if OP is not imported

## Notes

- [fallback-to-env.ts](./src/commands/fallback-to-env.ts) imports MyPlugin only
- [use-op-no-fallback.ts](./src/commands/use-op-no-fallback.ts) imports `@qui-cli/env/1Password.js` _and_ MyPlugin
- [MyPlugin.ts](./src/MyPlugin.ts) detects whether or not any implementation of Env has been imported, and imports the default implementation of Env if no other implementation has already been imported.

**N.B.** For this to successfully detect a previously imported implementation of Env, that implementation _must_ be imported _before_ MyPlugin is imported.
