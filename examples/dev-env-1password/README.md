# Example: Command

1Password integration with `@qui-cli/env` use

## Notes

- [index.ts](./src/index.ts) imports Env
- [package.json](./package.json)
  - Adds `@1password/sdk` as dependency
  - `scripts.example:env` invokes the command and passes it a service account token stored in 1Password.
