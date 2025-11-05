import { Base as PluginConfiguration } from './Configuration.js';
import { Arguments } from './Initialization.js';
import { Options, appendDefaultDocumentation, merge } from './Options.js';
import { Base as Plugin } from './Plugin.js';
import { AccumulatedResults } from './Run.js';

const plugins: Plugin[] = [];

export function registered() {
  return plugins;
}

export async function register(plugin: Plugin) {
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
  plugins.push(plugin);
}

export function reset() {
  for (const name in plugins) {
    delete plugins[name];
  }
}

export type Configuration = {
  [key: string]: PluginConfiguration;
};

export async function configure(config: Configuration = {}) {
  for (const plugin of plugins) {
    if (plugin.configure) {
      await plugin.configure(config[plugin.name] || {});
    }
  }
}

export async function options() {
  let options: Options = {};
  for (const plugin of plugins) {
    if (plugin.options) {
      options = merge(
        options,
        appendDefaultDocumentation(await plugin.options())
      );
    }
  }
  return options;
}

export async function init(
  args: Arguments<Awaited<ReturnType<typeof options>>>
) {
  for (const plugin of plugins) {
    if (plugin.init) {
      await plugin.init(args);
    }
  }
}

export async function run() {
  const results: AccumulatedResults = {};
  for (const plugin of plugins) {
    if (plugin.run) {
      results[plugin.name] = await plugin.run(results);
    }
  }
  return results;
}
