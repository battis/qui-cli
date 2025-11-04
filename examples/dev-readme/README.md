# Example: README

Demonstrate using `@qui-cli/markdown` to generate a README

## Notes

- If documenting a command, rather than a plugin, import the plugin portion only to avoid running the command when generating documentation.
- Call `Positionals.requireNoMoreThan(0)` immediately before `Core.init()` to override any required positionals from the imported command.

## Usage:

```bash
  docs.js -ha --z=<buzz> --bargle --baz=<baz> foo bar
```

## Arguments

#### `-h --help`

Get usage information

### dev-readme options

#### `-a --argle`

Sint ipsum aliquip veniam tempor occaecat.

#### `--bargle`

Tempor minim anim exercitation aliquip.

#### `--baz=<baz>`

Reprehenderit consequat, veniam velit.

#### `-z<buzz> --buzz=<buzz>`

Aliquip sunt tempor nisi labore ad culpa.
