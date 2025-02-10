import { Arguments } from './Arguments.js';
import { Options } from './Options.js';

export type Configuration = {};

export type Container = { [key: string]: any } & {
  name: string;
  dependencies: string[];

  configure: (config?: Configuration) => Promise<void>;

  /**
   * Override to include custom Jackspeak configuration.
   *
   * Will be called _before_ init() has been called.
   */
  options: () => Options;

  /**
   * Override to process user-provided arguments parsed by Jackspeak
   */
  init: (args: Arguments<ReturnType<Container['options']>>) => void;
};
