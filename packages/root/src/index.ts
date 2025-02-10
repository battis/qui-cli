import Plugin from '@battis/qui-cli.plugin';
import appRoot from 'app-root-path';

export type Configuration = Plugin.Configuration & {
  root?: string;
};

const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

let root = appRoot.toString();

export const Root: Plugin.Container = {
  name,
  dependencies,
  configure: async (config?: Configuration) => {
    root = config?.root || root;
  },
  options: () => ({}),
  init: () => {},
  path: () => root
};

export { Root as default };
