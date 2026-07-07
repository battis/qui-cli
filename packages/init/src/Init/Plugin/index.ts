import { Positionals } from '@qui-cli/core';

Positionals.require({
  name: {
    description: 'Package name (without scope)'
  }
});
Positionals.allowOnlyNamedArgs();

export const name = 'init';

export * from './configure.js';
export * from './init.js';
export * from './options.js';
export * from './run.js';
