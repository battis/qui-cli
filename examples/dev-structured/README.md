# Example: (Hierarchically) Structured Commands

A folder hierarchy of commands bundled into a single callable command

## Notes

[index.ts](./src/index.ts) and [alpha/index.ts](./src/alpha/index.ts) each `build()` a collection of commands out of the contents of their containing folders. [alpha/one.ts](./src/alpha/one.ts), [alpha/two.ts](./src/alpha/two.ts), and [beta.ts](./src/beta.ts) each define plugins that act as commands. This allows for a command to be built as sequence of categories or terms:

```sh
example alpha two
```

Invoking `--help` (`-h`) at any level lists available next terms:

```console
> example --help
Usage:
  example <command>

Commands may be:

  alpha

    Alpha is a command that has its own subcommands

  beta

    Beta is a command

> example alpha -h
Usage:
  example alpha <command>

Commands may be: one, two

> example alpha one
dev-structured/alpha/one ran!
```
