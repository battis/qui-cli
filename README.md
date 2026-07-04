# @qui-cli/qui-cli

A collection of packages for rapidly developing command line applications

- [@qui-cli/qui-cli](./packages/qui-cli/): bundled core functionality (colors, env, log, progress, root, shell, validators). Works well with [ora](https://www.npmjs.com/package/ora) and [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts).

Alternatively, individual packages can be selected and used in a more parsimonious, light-weight, modular manner:

# packages

<dl>
<dt><a href="colors/README.md">@qui-cli/colors</a></dt><dd>@qui-cli Plugin: Standardized Chalk colors for CLI output</dd>
<dt><a href="core/README.md">@qui-cli/core</a></dt><dd>Core features of @qui-cli/qui-cli</dd>
<dt><a href="env/README.md">@qui-cli/env</a></dt><dd>@qui-cli Plugin: Standardized environment configuration</dd>
<dt><a href="log/README.md">@qui-cli/log</a></dt><dd>@qui-cli Plugin: Standardized winston wrapper</dd>
<dt><a href="markdown/README.md">@qui-cli/markdown</a></dt><dd>@qui-cli Plugin: Export usage as markdown</dd>
<dt><a href="plugin/README.md">@qui-cli/plugin</a></dt><dd>@qui-cli plugin structure and registrar</dd>
<dt><a href="progress/README.md">@qui-cli/progress</a></dt><dd>@qui-cli Plugin: Progress bar for CLI app</dd>
<dt><a href="qui-cli/README.md">@qui-cli/qui-cli</a></dt><dd>Quickly build a CLI app</dd>
<dt><a href="root/README.md">@qui-cli/root</a></dt><dd>@qui-cli Plugin: Identify the root of the current application</dd>
<dt><a href="shell/README.md">@qui-cli/shell</a></dt><dd>@qui-cli Plugin: Standardized shelljs wrapper</dd>
<dt><a href="structured/README.md">@qui-cli/structured</a></dt><dd>Build a structured @qui-cli command from directory contents</dd>
<dt><a href="validators/README.md">@qui-cli/validators</a></dt><dd>@qui-cli Plugin: Input validators</dd>
</dl>

If using the modular approach, plugin definitions are managed by [@qui-cli/plugin](./packages/plugin/) and core functionality resides in [@qui-cli/core](./packages/core/)

[Examples of usage and development approaches are available.](./examples#readme)
