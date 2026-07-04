import * as Conf from './Conf.js';
import * as Init from './Init.js';
import * as Opt from './Opt.js';
import * as Run from './Run.js';
import * as Doc from './Doc.js';

export type Base = {
  name: string;
  configure?: Conf.Hook;
  options?: Opt.Hook;
  documentation?: Doc.Hook;
  init?: Init.Hook;
  run?: Run.Hook;
} & Record<string, unknown>;
