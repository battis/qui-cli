import * as Conf from './Conf.js';
import * as Init from './Init.js';
import * as Opt from './Opt.js';
import * as Run from './Run.js';

export type Base = {
  name: string;
  configure?: Conf.Hook;
  options?: Opt.Hook;
  init?: Init.Hook;
  run?: Run.Hook;
} & Record<string, unknown>;
