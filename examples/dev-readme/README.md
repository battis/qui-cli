# Example: README

Demonstrate using `@qui-cli/markdown` to generate a README

## Notes

- If documenting a command, rather than a plugin, import the plugin portion only to avoid running the command when generating documentation.
- Call `Positionals.requireNoMoreThan(0)` immediately before `Core.init()` to override any required positionals from the imported command.
- Note that the command name in the documentation is set by the name of the script that invokes `@qui-cli/markdown` (`./scripts/dev-readme` &rarr; `dev-readme`)

Usage:

<pre lang="bash">dev-readme -hA --z=&lt;buzz&gt; --bargle --commands --silent --logging --baz=&lt;baz&gt; --biz=&lt;biz&gt; --pi=&lt;pi&gt; --a=&lt;a&gt; --opAccount=&lt;example.1password.com&gt; --opItem=&lt;1Password unique identifier&gt; --opToken=&lt;token value&gt; --logFilePath=&lt;logFilePath&gt; --stdoutLevel=&lt;all|trace|debug|info|warning|error|fatal|off&gt; --fileLevel=&lt;all|trace|debug|info|warning|error|fatal|off&gt; <u>foo</u> <u>bar</u> <u>[...]</u></pre>



### Positional arguments

#### <u>`foo`</u>

Enim minim laborum dolore, eiusmod.

#### <u>`bar`</u>

Cillum ut sit, labore.

### Arguments

#### `-h --help`

Show this usage information

### dev-readme options

#### `-A --argle`

Sint ipsum aliquip veniam tempor occaecat.

#### `--bargle`

Tempor minim anim exercitation aliquip. (Default: `true`, use `--no-bargle` to disable)

#### `--baz=<baz>`

Reprehenderit consequat, veniam velit.

#### `-z<buzz> --buzz=<buzz>`

Aliquip sunt tempor nisi labore ad culpa. (Default: `"Sit"`)

#### `--biz=<biz>`

#### `--pi=<n>`

Esse eiusmod exercitation nulla nostrud do velit id. (Default: `3.2`)

#### `--a=<a>`

Default: `"foo"`, `"bar"`, `"baz"` Can be set multiple times

### 1Password environment integration

If 1Password secret references are stored in the environment, a 1Password service account token is required to access the secret values.

#### `--opAccount=<example.1password.com>`

1Password account to use (if signed into multiple); will use environment variable `OP_ACCOUNT` if present

#### `--opItem=<1Password unique identifier>`

Name or ID of the 1Password API Credential item storing the 1Password service account token; will use environment variable `OP_ITEM` if present. Requires the 1Password CLI tool (`https://developer.1password.com/docs/cli`)

#### `--opToken=<token value>`

1Password service account token; will use environment variable `OP_TOKEN` if present

### Shell command options

#### `--commands`

Include shell commands in log (Default: `true`, use `--no-commands` to disable)

#### `--silent`

Hide command output (Default: `false`)

#### `--logging`

Log commands and output at level `debug` (Default: `true`, use `--no-logging` to disable)

### Logging options

#### `--logFilePath=<logFilePath>`

Path to log file (optional)

#### `--stdoutLevel=<all|trace|debug|info|warning|error|fatal|off>`

Log level to console stdout (Default: `"info"`)

#### `--fileLevel=<all|trace|debug|info|warning|error|fatal|off>`

Log level to log file if `--logFilePath` provided (Default: `"all"`)
