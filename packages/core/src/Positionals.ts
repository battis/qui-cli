import { Colors } from '@battis/qui-cli.colors';
import * as Plugin from '@battis/qui-cli.plugin';

type PositionalConfig = {
  description?: string;
  hint?: string;
  validate?: (v?: string) => boolean | string;
};

type PositionalConfigSet = Record<string, PositionalConfig>;

export type Configuration = Plugin.Configuration & {
  min?: number;
  max?: number;
};

export const name = 'positionals';

let min = 0;
let max: number | undefined = undefined;
const configSet: PositionalConfigSet = {};

let positionals: (string | undefined)[] = [];

/** @deprecated Do not use, included for reverse compatibility */
export function requirePositionals(
  positionals: Configuration,
  arg?: boolean | number
) {
  if (
    arg !== undefined &&
    positionals.min === undefined &&
    positionals.max === undefined
  ) {
    if (typeof arg === 'number') {
      setMinArgs(arg);
      setMaxArgs(arg);
    } else if (arg) {
      setMinArgs(1);
    }
  }
  return min;
}

export function configure(config: Configuration = {}) {
  setMinArgs(Plugin.hydrate(config.min, min));
  const m = Plugin.hydrate(config.max, max);
  if (m !== undefined) {
    setMaxArgs(m);
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

export function setMinArgs(minimumArgs: number) {
  if (minimumArgs < 0) {
    throw new Error(`Cannot require fewer than 0 positional args.`);
  }
  if (max !== undefined && minimumArgs > max) {
    throw new Error(
      `Cannot require ${minimumArgs} positional args when the maximum nunber of positional args is ${max}.`
    );
  }
  min = minimumArgs;
}

export function setMaxArgs(maximumArgs: number) {
  if (maximumArgs >= min && maximumArgs >= Object.keys(configSet).length) {
    max = maximumArgs;
  } else {
    throw new Error(
      `Cannot require max ${max} positional args, ${Object.keys(configSet).length} required positional args are configured.`
    );
  }
}

export function init(args: Plugin.ExpectedArguments<() => Plugin.Options>) {
  positionals = [...args.positionals];
}

function usageArgs() {
  const names = Object.keys(configSet);
  const named = names.length;
  if (max && max > named) {
    const unnamed = max - named;
    for (let i = 0; i < unnamed; i++) {
      names.push(`arg${i}`);
    }
    names[min] = `[${names[min]}`;
    names[names.length - 1] = `${names[names.length - 1]}]`;
    return names;
  } else {
    names.push('[...]');
    return names;
  }
}

export function usage(usage: string): string {
  const lines = usage.split('\n');
  let u = false;
  let i = 0;
  for (i = 0; i < lines.length; i++) {
    if (lines[i] === 'Usage:') {
      u = true;
    }
    if (u && lines[i] === '') {
      break;
    }
  }
  i--;
  const args = usageArgs();
  let cumulative = 0;
  for (let a = 0; a < args.length; a++) {
    if (
      lines[i].length - 9 * cumulative + args[a].length + 1 <=
      process.stdout.columns
    ) {
      lines[i] += ` ${Colors.positionalArg(args[a])}`;
      cumulative++;
    } else {
      lines.splice(i + 1, 0, `  ${Colors.positionalArg(args[a])}`);
      cumulative = 1;
      i++;
    }
  }
  return lines.join('\n');
}

export function usageMarkdown(usageMarkdown: string): string {
  return usageMarkdown;
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
  Object.keys(configSet).forEach((name, i) => {
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
  const i = Object.keys(configSet).indexOf(positionalArgName);
  if (i < 0) {
    throw new Error(
      `'${positionalArgName}' is not a defined positional argument.`
    );
  }
  return positionals[i];
}
