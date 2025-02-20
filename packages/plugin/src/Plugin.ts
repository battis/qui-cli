import { Arguments } from './Arguments.js';
import { Options } from './Options.js';

export type Configuration = Record<string, any>;

export type Base<O extends Options = Options> = {
  name: string;
  src: string;
  configure?: (config: Configuration) => void;
  options?: () => Options;
  init?: (args: Arguments<O>) => void;
} & Record<string, any>;
