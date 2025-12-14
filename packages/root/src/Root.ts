import * as Plugin from '@qui-cli/plugin';
import appRoot from 'app-root-path';
import nodePath from 'node:path';

export const name = 'root';

export type Configuration = Plugin.Configuration & {
  /** Base for resolving any relative file paths */
  root?: string;
  /**
   * Use `root` as the current working directory (default `true`) or path to an
   * alternate working directory (optionally relative to `root`)
   */
  cwd?: string | boolean;
};

const config: Configuration = {
  root: appRoot.toString(),
  cwd: true
};

export function path(): string {
  if (!config.root) {
    throw new Error('Root is not defined.');
  }
  return config.root;
}

export function configure(proposal: Configuration = {}) {
  Plugin.Conf.propose(config, proposal);
  if (config.cwd && config.root) {
    if (typeof config.cwd === 'boolean') {
      process.chdir(config.root);
    } else {
      process.chdir(nodePath.resolve(config.root, config.cwd));
    }
  }
}
