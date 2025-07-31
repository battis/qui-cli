# Example: Command

1Password implementation of `@battis/qui-cli.env` use

## Notes

- [index.ts](./src/index.ts) imports the 1Password implementation of Env (mutually exclusive from the regular implementation) as `OP`
- [package.json](./package.json) `scripts.example:env` invokes the command and passes it a service account token stored in 1Password.
