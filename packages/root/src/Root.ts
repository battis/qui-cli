import * as Plugin from '@battis/qui-cli.plugin';
import appRoot from 'app-root-path';
import nodePath from 'node:path';

export const name = 'root';

export const src = import.meta.dirname;

export type Configuration = Plugin.Configuration & {
  /** base for resolving any relative file paths */
  root?: string;

  /**
   * use `root` as the current working directory (default `true`) or path to
   * an alternate working directory (optionally relative to `root`)
   */
  cwd?: string | boolean;
};

let root: string = appRoot.toString();
let cwd: string | boolean = true;

export function path() {
  return root;
}

export function configure(config: Configuration = {}) {
  root = Plugin.hydrate(config.root, root);
  cwd = Plugin.hydrate(config.cwd, cwd);
  if (cwd) {
    if (typeof cwd === 'boolean') {
      process.chdir(root);
    } else {
      process.chdir(nodePath.resolve(root, cwd));
    }
  }
}
