import { Colors } from '@battis/qui-cli.colors';
import { Log } from '@battis/qui-cli.log';
import * as Plugin from '@battis/qui-cli.plugin';
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
export const src = import.meta.dirname;

let showCommands = true;
let silent = false;
let result: shell.ShellString | undefined = undefined;

export function configure(config: Configuration) {
  showCommands = Plugin.hydrate(config.showCommands, showCommands);
  silent = Plugin.hydrate(config.silent, silent);
}

export function options() {
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

/** @deprecated use configure() */
export function setShowCommands(commandsAreShownInConsole: boolean) {
  return (showCommands = commandsAreShownInConsole);
}

/** @deprecated use configure() */
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

/** @deprecated use shelljs */
export const cd = shell.cd;

/** @deprecated use shelljs */
export const pwd = shell.pwd;

/** @deprecated use shelljs */
export const ls = shell.ls;

/** @deprecated use shelljs */
export const find = shell.find;

/** @deprecated use shelljs */
export const cp = shell.cp;

/** @deprecated use shelljs */
export const rm = shell.rm;

/** @deprecated use shelljs */
export const mv = shell.mv;

/** @deprecated use shelljs */
export const mkdir = shell.mkdir;

/** @deprecated use shelljs */
export const test = shell.test;

/** @deprecated use shelljs */
export const cat = shell.cat;

/** @deprecated use shelljs */
export const sed = shell.sed;

/** @deprecated use shelljs */
export const grep = shell.grep;

/** @deprecated use shelljs */
export const which = shell.which;

/** @deprecated use shelljs */
export const echo = shell.echo;

/** @deprecated use shelljs */
export const pushd = shell.pushd;

/** @deprecated use shelljs */
export const popd = shell.popd;

/** @deprecated use shelljs */
export const dirs = shell.dirs;

/** @deprecated use shelljs */
export const ln = shell.ln;

/** @deprecated use shelljs */
export const exit = shell.exit;

/** @deprecated use shelljs */
export const env = shell.env;

/** @deprecated use shelljs */
export const sort = shell.sort;

/** @deprecated use shelljs */
export const tail = shell.tail;

/** @deprecated use shelljs */
export const uniq = shell.uniq;

/** @deprecated use shelljs */
export const set = shell.set;
