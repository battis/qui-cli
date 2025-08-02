import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
import { Colors } from '@qui-cli/colors';
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

export const name = 'shell';

let showCommands = true;
let silent = false;
let result: shell.ShellString | undefined = undefined;

export function configure(config: Configuration = {}) {
  showCommands = Plugin.hydrate(config.showCommands, showCommands);
  silent = Plugin.hydrate(config.silent, silent);
}

export function options(): Plugin.Options {
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

export function init({
  values = {}
}: Plugin.Arguments<ReturnType<typeof options>>): void {
  showCommands = Plugin.hydrate(values.commands, showCommands);
  silent = Plugin.hydrate(values.silent, silent);
}

function keywords(command: string) {
  return command.replace(
    /((^\s*|\|\|?|&&)\s*)(\w+)/gm,
    `$1${Colors.keyword('$3')}`
  );
}

export function get() {
  return shell;
}

export function exec(command: string) {
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

/** @deprecated Use configure() */
export function setShowCommands(commandsAreShownInConsole: boolean) {
  return (showCommands = commandsAreShownInConsole);
}

/** @deprecated Use configure() */
export function setSilent(commandsAreExecutedSilentlyInConsole: boolean) {
  return (silent = commandsAreExecutedSilentlyInConsole);
}

export function isSilent() {
  return silent;
}

export function commandsShown() {
  return showCommands;
}

export function getPreviousResult() {
  return result;
}

/** @deprecated Use shelljs */
export const cd = shell.cd;

/** @deprecated Use shelljs */
export const pwd = shell.pwd;

/** @deprecated Use shelljs */
export const ls = shell.ls;

/** @deprecated Use shelljs */
export const find = shell.find;

/** @deprecated Use shelljs */
export const cp = shell.cp;

/** @deprecated Use shelljs */
export const rm = shell.rm;

/** @deprecated Use shelljs */
export const mv = shell.mv;

/** @deprecated Use shelljs */
export const mkdir = shell.mkdir;

/** @deprecated Use shelljs */
export const test = shell.test;

/** @deprecated Use shelljs */
export const cat = shell.cat;

/** @deprecated Use shelljs */
export const sed = shell.sed;

/** @deprecated Use shelljs */
export const grep = shell.grep;

/** @deprecated Use shelljs */
export const which = shell.which;

/** @deprecated Use shelljs */
export const echo = shell.echo;

/** @deprecated Use shelljs */
export const pushd = shell.pushd;

/** @deprecated Use shelljs */
export const popd = shell.popd;

/** @deprecated Use shelljs */
export const dirs = shell.dirs;

/** @deprecated Use shelljs */
export const ln = shell.ln;

/** @deprecated Use shelljs */
export const exit = shell.exit;

/** @deprecated Use shelljs */
export const env = shell.env;

/** @deprecated Use shelljs */
export const sort = shell.sort;

/** @deprecated Use shelljs */
export const tail = shell.tail;

/** @deprecated Use shelljs */
export const uniq = shell.uniq;

/** @deprecated Use shelljs */
export const set = shell.set;
