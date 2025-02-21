import * as Plugin from '@battis/qui-cli.plugin';
import appRoot from 'app-root-path';
import nodePath from 'node:path';

export const name = 'root';

export const src = import.meta.dirname;

export type Configuration = Plugin.Configuration & {
  root?: string;
  cwd?: string | boolean;
};

let root: string = appRoot.toString();

export function path() {
  return root;
}

export function configure(config: Configuration = {}) {
  root = Plugin.hydrate(config.root, root);
  if (config.cwd) {
    if (config.cwd === true) {
      process.chdir(root);
    } else {
      process.chdir(nodePath.resolve(root, config.cwd));
    }
  }
}
