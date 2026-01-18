import * as Conf from './Conf.js';
import * as Init from './Init.js';
import * as Opt from './Opt.js';
import * as Plugin from './Plugin.js';
import * as Run from './Run.js';

const plugins: Plugin.Base[] = [];

export function registered() {
  return plugins;
}

export async function register(plugin: Plugin.Base) {
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].name === plugin.name) {
      if (plugins[i] !== plugin) {
        throw new Error(
          `A plugin named '${plugin.name}' has already been registered.`
        );
      }
      return;
    }
  }

  plugins.push({
    name: plugin.name,
    configure: plugin.configure ? plugin.configure.bind(plugin) : undefined,
    options: plugin.options
      ? async () =>
          plugin.options ? Opt.documentDefaults(await plugin.options()) : {}
      : undefined,
    init: plugin.init ? plugin.init.bind(plugin) : undefined,
    run: plugin.run ? plugin.run.bind(plugin) : undefined
  });
}

export function reset() {
  for (const name in plugins) {
    delete plugins[name];
  }
}

export type Configuration = {
  [key: string]: Conf.Base;
};

export async function configure(config: Configuration = {}) {
  for (const plugin of plugins) {
    if (plugin.configure) {
      await plugin.configure(config[plugin.name] || {});
    }
  }
}

export async function init(args: Init.Arguments<Opt.Options>) {
  for (const plugin of plugins) {
    if (plugin.init) {
      await plugin.init(args);
    }
  }
}

export async function run() {
  const results: Run.AccumulatedResults = {};
  for (const plugin of plugins) {
    if (plugin.run) {
      results[plugin.name] = await plugin.run(results);
    }
  }
  return results;
}
