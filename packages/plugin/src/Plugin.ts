import { Arguments } from './Arguments.js';
import * as Configuration from './Configuration.js';
import * as Options from './Options.js';

export type Base<O extends Options.Options = Options.Options> = {
  name: string;
  src: string;
  configure?: Configuration.Hook;
  options?: Options.Hook;
  init?: (args: Arguments<O>) => void | Promise<void>;
} & Record<string, any>;
