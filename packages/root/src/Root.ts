import * as Plugin from '@battis/qui-cli.plugin';
import appRoot from 'app-root-path';

export const name = 'root';

export const src = import.meta.dirname;

export type Configuration = Plugin.Configuration & {
  root?: string;
};

let root: string = appRoot.toString();

export function path() {
  return root;
}

export function configure(config: Configuration = {}) {
  root = Plugin.hydrate(config.root, root);
}
