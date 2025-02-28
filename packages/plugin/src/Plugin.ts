import { Arguments } from './Arguments.js';
import * as Options from './Options.js';

export type Configuration = Record<string, any>;

export type Base<O extends Options.Options = Options.Options> = {
  name: string;
  src: string;
  configure?: (config: Configuration) => void | Promise<void>;
  options?: Options.Hook;
  init?: (args: Arguments<O>) => void | Promise<void>;
} & Record<string, any>;
