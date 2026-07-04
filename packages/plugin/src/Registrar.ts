import * as Conf from './Conf.js';
import * as Init from './Init.js';
import * as Opt from './Opt.js';
import * as Plugin from './Plugin.js';
import * as Run from './Run.js';
import { ConfigType } from 'jackspeak';

const plugins: Plugin.Base[] = [];

export function registered() {
  return plugins;
}

export async function register(plugin: Plugin.Base) {
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].name === plugin.name) {
      if (plugins[i] !== plugin) {
        throw new Error(
          `A plugin named '${plugin.name}' has already been registered.`,
          { cause: { plugin, registered: plugins } }
        );
      }
      return;
    }
  }

  plugins.push({
    name: plugin.name,
    configure: plugin.configure?.bind(plugin),
    options: async () =>
      plugin.options ? await documentation(await plugin.options()) : {},
    documentation: plugin.documentation?.bind(plugin),
    init: plugin.init?.bind(plugin),
    run: plugin.run?.bind(plugin)
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

export async function documentation<O extends Opt.Options = Opt.Options>(
  options: O
): Promise<O> {
  for (const plugin of plugins) {
    if (plugin.documentation) {
      for (const { optType, configType, multiple } of [
        { optType: 'opt', configType: 'string', multiple: false },
        { optType: 'optList', configType: 'string', multiple: true },
        { optType: 'num', configType: 'number', multiple: false },
        { optType: 'numList', configType: 'number', multiple: true },
        { optType: 'flag', configType: 'boolean', multiple: false },
        { optType: 'flagList', configType: 'boolean', multiple: true }
      ] as {
        optType: Exclude<keyof Opt.Options, 'man' | 'fields'>;
        configType: ConfigType;
        multiple: boolean;
      }[]) {
        for (const longOption in options[optType]) {
          options[optType][longOption] = await plugin.documentation(
            longOption,
            options[optType][longOption],
            configType,
            multiple
          );
        }
      }
    }
  }
  return options;
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
