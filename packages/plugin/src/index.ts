import { merge } from './Options.js';
import { register } from './Registrar.js';

export { Arguments } from './Arguments.js';
export { Options } from './Options.js';
export { Configuration } from './Plugin.js';
export * as Registrar from './Registrar.js';

export { merge as mergeOptions, register };

export function hydrate(proposed: any, fallback: any) {
  if (proposed === undefined) {
    return fallback;
  }
  return proposed;
}
