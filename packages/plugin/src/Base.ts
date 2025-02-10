import { Arguments } from './Arguments.js';
import { Configuration, Container } from './Container.js';
import { Options } from './Options.js';

export async function configure(config?: Configuration): Promise<void> {}

export function options(): Options {
  return {};
}

export function init(args: Arguments<ReturnType<typeof options>>): void {}
