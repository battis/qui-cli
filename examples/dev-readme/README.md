# Example: README

Demonstrate using `@qui-cli/markdown` to generate a README

## Notes

- If documenting a command, rather than a plugin, import the plugin portion only to avoid running the command when generating documentation.
- Call `Positionals.requireNoMoreThan(0)` immediately before `Core.init()` to override any required positionals from the imported command.
- Note that the command name in the documentation is set by the name of the script that invokes `@qui-cli/markdown` (`./scripts/dev-readme` &rarr; `dev-readme`)

## Usage:

```bash
  dev-readme -hA --z=<buzz> --bargle --baz=<baz> --biz=<biz> --pi=<pi> --a=<a> foo bar
```

## Arguments

#### `-h --help`

Get usage information

# dev-readme options

## `-A --argle`

Sint ipsum aliquip veniam tempor occaecat.

## `--bargle`

Tempor minim anim exercitation aliquip. (Default: true, use --no-bargle to disable)

## `--baz=<baz>`

Reprehenderit consequat, veniam velit.

## `-z<buzz> --buzz=<buzz>`

Aliquip sunt tempor nisi labore ad culpa. (Default: "Sit")

## `--biz=<biz>`

## `--pi=<n>`

Esse eiusmod exercitation nulla nostrud do velit id. (Default: 3.2)

## `--a=<a>`

Default: "foo", "bar", "baz" Can be set multiple times
