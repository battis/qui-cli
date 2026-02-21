import * as Colors from '@qui-cli/colors/dist/Colors.js';
import * as Plugin from '@qui-cli/plugin';
import wrapAnsi from 'wrap-ansi';

type PositionalConfig = {
  /** Description of the purpose of the positional argument */
  description?: string;
  /** Hint about the value of the positional argument */
  hint?: string;
  /** Must return true for the argument to be accepted */
  validate?: (v?: string) => boolean | string;
};

type PositionalConfigSet = Record<string, PositionalConfig>;

export type Configuration = Plugin.Configuration & {
  /** Minimum number of accepted positional arguments */
  min?: number;
  /** Maximum number of accepted positional arguments */
  max?: number;
};

export const name = 'positionals';

let min = 0;
let max: number | undefined = undefined;
const configSet: PositionalConfigSet = {};

let positionals: (string | undefined)[] = [];

/** @deprecated Do not use, included for backwards compatibility */
export function requirePositionalsIsDeprecatedAndShouldNotBeUsed(
  positionals: Configuration,
  arg?: boolean | number
) {
  if (
    arg !== undefined &&
    positionals.min === undefined &&
    positionals.max === undefined
  ) {
    if (typeof arg === 'number') {
      requireAtLeast(arg);
      requireNoMoreThan(arg);
    } else if (arg) {
      requireAtLeast(1);
    }
  }
  return min;
}

export function configure(config: Configuration = {}) {
  requireAtLeast(Plugin.hydrate(config.min, min));
  const m = Plugin.hydrate(config.max, max);
  if (m !== undefined) {
    requireNoMoreThan(m);
  }
}

export function require(positionalConfigSet: PositionalConfigSet) {
  const names = Object.keys(positionalConfigSet);
  for (const name of names) {
    if (name in configSet) {
      throw new Error(
        `A positional argument named ${name} has already been defined and cannot be redefined.`
      );
    }
    configSet[name] = positionalConfigSet[name];
  }
  min += names.length;
  if (max !== undefined) {
    max += names.length;
  }
}

function names() {
  return Object.keys(configSet);
}

function namedCount() {
  return names().length;
}

export function minimumArgCount() {
  return min;
}

export function requireAtLeast(minimumArgs: number) {
  if (minimumArgs < 0) {
    throw new Error(`Cannot require fewer than 0 positional args.`);
  }
  if (max !== undefined && minimumArgs > max) {
    throw new Error(
      `Cannot require min ${minimumArgs} positional args, maximum ${max} required positional args are configured.`
    );
  }
  min = minimumArgs;
}

export function maximumArgCount() {
  return max;
}

export function requireNoMoreThan(maximumArgs: number) {
  if (maximumArgs >= min && maximumArgs >= namedCount()) {
    max = maximumArgs;
  } else {
    throw new Error(
      `Cannot require max ${max} positional args, minimum ${namedCount()} required positional args are configured.`
    );
  }
}

export function allowOptionalArgs() {
  max = undefined;
}

export function allowOnlyNamedArgs() {
  requireNoMoreThan(min);
}

export function minimumUnnamedArgCount() {
  return Math.max(0, min - namedCount());
}

/**
 * Caution: this should not be set within plugins due to potential confusion and
 * overlap!
 *
 * @param minUnnamed Number of optional args to allow
 */
export function requireAtLeastUnnamedArgs(minUnnamed: number) {
  if (max && min + minUnnamed > max) {
    throw new Error(
      `Cannot require min ${minUnnamed} unnamed positional args, maximum ${max - namedCount()} unnamed positioal args are configure.`
    );
  }
  requireAtLeast(min + minUnnamed);
}

export function maximumUnnamedCount() {
  return max ? max - namedCount() : undefined;
}

/**
 * Caution: this should not be set within plugins due to potential confusion and
 * overlap!
 *
 * @param maxUnnamed Number of optional args to allow
 */
export function requireNoMoreThanUnnamedArgs(maxUnnamed: number) {
  if (maxUnnamed < 0) {
    throw new Error(
      `Cannot require a negative number of unnamed positional args.`
    );
  }
  if (maxUnnamed < min - namedCount()) {
    throw new Error(
      `Cannot require max ${maxUnnamed} unnamed positional args, minimum ${min - namedCount()} unnamed positional args are configured.`
    );
  }
  requireNoMoreThan(namedCount() + maxUnnamed);
}

export function options(): Plugin.Options {
  const man: Plugin.Options['man'] = [];
  for (const arg in configSet) {
    man.push({
      level: 2,
      text: `${Colors.positionalArg(arg)}${configSet[arg].hint ? `=<${configSet[arg].hint}>` : ''}`
    });
    if (configSet[arg].description) {
      man.push({ text: configSet[arg].description });
    }
  }
  if (man.length > 0) {
    man.unshift({ level: 1, text: 'Positional arguments' });
  }
  return { man };
}

export function init(args: Plugin.ExpectedArguments<() => Plugin.Options>) {
  positionals = [...args.positionals];
}

function unnamed(args: string[], count: number) {
  for (let i = 0; i < count; i++) {
    args.push(`arg${i}`);
  }
  return args;
}

function optional(args: string[], required: number) {
  if (required < args.length) {
    args[required] = `[${args[required]}`;
    args[args.length - 1] = `${args[args.length - 1]}]`;
  }
  return args;
}

function ellipsis(args: string[], start: number, end: number) {
  if (end - start > 3) {
    args.splice(start + 1, end - start - 2, '...');
  }
  return args;
}

export function usageArgs() {
  let args = names();
  args = unnamed(args, (max || min) - namedCount());
  if (!max) {
    args.push('...');
  }
  args = optional(args, min);
  if (max) {
    args = ellipsis(args, min, args.length);
  }
  args = ellipsis(args, namedCount(), min);

  return args.map((arg) => Colors.positionalArg(arg)).join(' ');
}

function wrap(text: string, indent: number) {
  return wrapAnsi(text, process.stdout.columns - indent, { wordWrap: true })
    .split('\n')
    .map((line) => {
      for (let i = 0; i < indent; i++) {
        line = ' ' + line;
      }
      return line;
    })
    .join('\n');
}

export function usage(usage: string, isMarkdown = false): string {
  let pre = usage.slice(0, usage.indexOf('\n') + 1);
  let cmd = usage.slice(pre.length, usage.indexOf('\n\n'));
  let post = usage.slice(pre.length + cmd.length);
  if (isMarkdown) {
    pre = usage.slice(0, usage.indexOf('```\n') + 4);
    cmd = usage.slice(pre.length, usage.indexOf('\n```', pre.length));
    post = usage.slice(pre.length + cmd.length);
  }
  return `${pre}${wrap(
    `${cmd
      .split('\n')
      .map((token) => token.trim())
      .join(' ')} ${usageArgs()}`,
    2
  )}${post}`;
}

export function run() {
  const s = positionals.length !== 1 ? 's' : '';
  if (positionals.length < min) {
    throw new Error(
      `Expected at least ${min} positional arguments, received ${positionals.length} positional argument${s}.`
    );
  }
  if (max !== undefined && positionals.length > max) {
    throw new Error(
      `Expected no more than ${max} positional arguments, received ${positionals.length} positional argument${s}.`
    );
  }
  names().forEach((name, i) => {
    if (configSet[name].validate) {
      const message = configSet[name].validate(positionals[i]);
      if (!message || typeof message === 'string') {
        throw new Error(
          `Positional argument '${name}' (arg${i}) is not valid${!message ? '.' : `: ${message}`}`
        );
      }
    }
  });
}

export function get(positionalArgName: string) {
  const i = names().indexOf(positionalArgName);
  if (i < 0) {
    throw new Error(
      `'${positionalArgName}' is not a defined positional argument.`
    );
  }
  return positionals[i];
}

export function namedArgs() {
  const args: Record<string, string | undefined> = {};
  for (let i = 0; i < namedCount(); i++) {
    args[names()[i]] = positionals[i];
  }
  return args;
}

export function unnamedArgs() {
  return positionals.slice(namedCount());
}

export function unnamedArg(i: number) {
  return unnamedArgs()[i];
}
