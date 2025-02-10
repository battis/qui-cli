import Plugin from '@battis/qui-cli.plugin';
import appRoot from 'app-root-path';

export type Container = Plugin.Container & {
  path: typeof path;
};

export type Configuration = Plugin.Configuration & {
  root?: string;
};

const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

let root = appRoot.toString();

async function configure(config?: Configuration) {
  root = config?.root || root;
}

/**
 * Configured working directory for the app (defaults to the root of the current project)
 */
function path() {
  return root;
}

export const Root: Container = {
  name,
  dependencies,

  configure,
  options: () => ({}),
  init: () => {},

  path
};

export { Root as default };
