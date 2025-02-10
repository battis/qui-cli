import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import Plugin from '@battis/qui-cli.plugin';
import ora, { Ora } from 'ora';
import shell from 'shelljs';

type CommandLogEntry = {
  message?: string;
  command: string;
  stdout?: string;
  stderr?: string;
};

export type Configuration = Plugin.Configuration & {
  showCommands?: boolean;
  silent?: boolean;
};

let showCommands = true;
let silent = false;
let result: shell.ShellString | undefined = undefined;

async function configure(config?: Configuration) {
  showCommands =
    config?.showCommands !== undefined ? config.showCommands : showCommands;
  silent = config?.silent !== undefined ? config.silent : silent;
}

function options() {
  return {
    flag: {
      commands: {
        description: `Include shell commands in log (default: ${Colors.value(showCommands)}, ${Colors.value('--no-commands')} to disable)`,
        default: showCommands
      },
      silent: {
        description: `Hide command output (default: ${Colors.value(silent)})`,
        default: silent
      }
    }
  };
}

function init({
  values: { silent: s, commands: c } = {}
}: Plugin.Arguments<ReturnType<typeof options>>): void {
  showCommands = c !== undefined ? c : showCommands;
  silent = s !== undefined ? s : silent;
}

function keywords(command: string) {
  return command.replace(
    /((^\s*|\|\|?|&&)\s*)(\w+)/gm,
    `$1${Colors.keyword('$3')}`
  );
}

function get() {
  return shell;
}

function exec(command: string) {
  let spinner: Ora | undefined = undefined;
  if (showCommands && silent) {
    spinner = ora(Colors.command(keywords(command))).start();
  } else if (showCommands) {
    shell.echo(Colors.command(keywords(command)));
  }
  const entry: CommandLogEntry = { command };
  result = shell.exec(command, { silent });
  if (result.stdout.length) entry.stdout = result.stdout;
  if (result.stderr.length) entry.stderr = result.stderr;
  Log.debug(entry);
  if (spinner) {
    spinner.succeed(Colors.command(keywords(command)));
  }
  return result;
}

function setShowCommands(commandsAreShownInConsole: boolean) {
  return (showCommands = commandsAreShownInConsole);
}

function setSilent(commandsAreExecutedSilentlyInConsole: boolean) {
  return (silent = commandsAreExecutedSilentlyInConsole);
}

function isSilent() {
  return silent;
}

function commandsShown() {
  return showCommands;
}

function getPreviousResult() {
  return result;
}

const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

export const Shell: Plugin.Container = {
  name,
  dependencies,

  configure,
  options,
  init,

  exec,
  setShowCommands,
  setSilent,
  isSilent,
  commandsShown,
  getPreviousResult
};

export { Shell as default };
