# Example: Command

A distributable command-line app

## Notes

- [index.ts](./src/index.ts) implements the command.
- [package.json](./package.json) `directories.bin` points to directory of registered scripts.
- [bin/dev-command](./bin/dev-command) is executable (`chmod +x`) and has the standard node shebang, and imports the command -- this structure allows for reliable use of the command across different package managers.
