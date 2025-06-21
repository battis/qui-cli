import * as Configuration from './Configuration.js';
import * as Initialization from './Initialization.js';
import * as Options from './Options.js';
import * as Run from './Run.js';

export type Base = {
  name: string;
  src: string;
  configure?: Configuration.Hook;
  options?: Options.Hook;
  init?: Initialization.Hook;
  run?: Run.Hook;
} & Record<string, unknown>;
