import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import ora, { Ora } from 'ora';
import shell from 'shelljs';

type CommandLogEntry = {
  message?: string;
  command: string;
  stdout?: string;
  stderr?: string;
};

export type Configuration = Plugin.Configuration & {
  /**
   * Whether or not to display the commands (rather than just their output) in
   * the console, defaults to `false`.
   */
  showCommands?: boolean;
  /**
   * Whether or not to show command output (and, potentially, commands
   * themselves) in the console, defaults to `true`.
   */
  silent?: boolean;
  /**
   * Whether or not to log commands and output at level `debug`, defaults to
   * `true`
   */
  logging?: boolean;
};

export const name = 'shell';

let showCommands = true;
let silent = false;
let result: shell.ShellString | undefined = undefined;
let logging = true;

export function configure(config: Configuration = {}) {
  showCommands = Plugin.hydrate(config.showCommands, showCommands);
  silent = Plugin.hydrate(config.silent, silent);
  logging = Plugin.hydrate(config.logging, logging);
}

export function options(): Plugin.Options {
  return {
    man: [{ level: 1, text: 'Shell command options' }],
    flag: {
      commands: {
        description: `Include shell commands in log`,
        default: showCommands
      },
      silent: {
        description: `Hide command output`,
        default: silent
      },
      logging: {
        description: `Log commands and output at level ${Colors.value('debug')}`,
        default: logging
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
  if (logging) {
    Log.debug(entry);
  }
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

export function isLogging() {
  return logging;
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
