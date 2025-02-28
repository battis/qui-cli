import * as Configuration from './Configuration.js';
import * as Initialization from './Initialization.js';
import * as Options from './Options.js';

export type Base = {
  name: string;
  src: string;
  configure?: Configuration.Hook;
  options?: Options.Hook;
  init?: Initialization.Hook;
} & Record<string, any>;
