# Distributable Command

The core functionality of @qui-cli: quickly convert command line input into both documentation and usable parameters.

To run the command (after building the package):

```sh
> cd path/to/this/package
> ./bin/my-command
```

The command usage can be seen by passing the `--help` or `-h` flag:

```sh
> ./bin/my-command -h
Usage:
  my-command -hb --s=<A> --n=<numberValue> [...]

  -h --help          Show this usage information
  -s<A> --stringValue=<A>
                     A text option
  -n<n> --numberValue=<n>
                     A number option (with a secret default value)
  -b --booleanValue  A boolean flag
```

Review the [index.ts](./src/index.ts) inlne documentation for basic development usage.

Note that…

1. [package.json](./package.json) includes a `bin` property to export the command itself
2. [my-command](./bin/my-command) names the command (with the file name itself) and is both marked executable and includes the node shebang for shell execution. The file just imports the compiled script from the `dist` directory.
