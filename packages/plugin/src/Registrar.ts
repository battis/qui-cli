import Package from '@battis/import-package-json';
import fs from 'node:fs';
import path from 'node:path';
import { Base as PluginConfiguration } from './Configuration.js';
import { Arguments } from './Initialization.js';
import { Options, merge } from './Options.js';
import { Base as Plugin } from './Plugin.js';
import { AccumulatedResults } from './Run.js';

export type RegisteredPlugin = Plugin & {
  package: {
    path: string;
    name: string;
    version: string;
    dependencies: Record<string, string>;
  };
};

const plugins: Record<string, RegisteredPlugin> = {};

export function registeredPlugins(name: string) {
  for (const plugin of Object.keys(plugins)) {
    if (plugins[plugin].package.name === name) {
      return true;
    }
  }
  return false;
}

export async function register(
  plugin: Plugin,
  matchPluginDependencies = registeredPlugins
) {
  const pkgPath = path.resolve(plugin.src, '../package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(
      `Could not find package.json for ${plugin.name} at ${pkgPath}.`
    );
  }

  const pkg = await Package.importLocal(pkgPath);
  if (!pkg.name || !pkg.version) {
    throw new Error(
      `package.json for ${plugin.name} must define name and version properties.`
    );
  }

  const availablePackages = { ...pkg.peerDependencies, ...pkg.dependencies };

  const registree: RegisteredPlugin = {
    ...plugin,
    package: {
      path: pkgPath,
      name: pkg.name,
      version: pkg.version,
      dependencies: Object.keys(availablePackages)
        .filter(matchPluginDependencies)
        .reduce(
          (dependencies, name) => {
            dependencies[name] = availablePackages[name];
            return dependencies;
          },
          {} as Record<string, string>
        )
    }
  };

  if (registree.name in plugins) {
    if (
      plugins[registree.name].package.name == registree.package.name &&
      plugins[registree.name].package.version == registree.package.version &&
      plugins[registree.name].package.path == registree.package.path
    ) {
      return;
    }
    throw new Error(
      `${registree.package.name}@${registree.package.version} attempted to register as "${registree.name}" (${registree.package.path}), but ${plugins[registree.name].package.name}@${plugins[registree.name].package.version} is already registered as "${registree.name}" (${plugins[registree.name].package.path}).`
    );
  }

  plugins[registree.name] = registree;

  for (const name in plugins) {
    const error = circularDependency(name);
    if (error) {
      throw new Error(`Circular dependency detected: ${error}`);
    }
  }
}

function nameFromPackageName(packageName: string) {
  for (const name in plugins) {
    if (plugins[name].package.name === packageName) {
      return name;
    }
  }
  return undefined;
}

function extendDependencyChain(chain: string[] = [], name: string) {
  return [
    ...chain,
    `${name} (${plugins[name].package.name}@${plugins[name].package.version})`
  ];
}

function circularDependency(
  name: string,
  base?: string,
  chain?: string[]
): false | string {
  base = base || name;
  chain = extendDependencyChain(chain, name);
  const basePackageName = plugins[base].package.name;
  if (basePackageName in plugins[name].package.dependencies) {
    return extendDependencyChain(chain, base).join(' → ');
  } else {
    for (const dependency in plugins[name].package.dependencies) {
      const dependencyName = nameFromPackageName(dependency);
      if (dependencyName) {
        const circular = circularDependency(dependencyName, base, chain);
        if (circular) {
          return circular;
        }
      }
    }
    return false;
  }
}

export function registered() {
  const keys: (keyof typeof plugins)[] = Object.keys(plugins);
  return keys.map((name) => ({
    name,
    package: plugins[name].package
  }));
}

export function reset() {
  for (const name in plugins) {
    delete plugins[name];
  }
}

export type Configuration = {
  [key: keyof typeof plugins]: PluginConfiguration;
};

export async function configure(config: Configuration = {}) {
  for (const name of Object.keys(plugins)) {
    const plugin = plugins[name];
    if (plugin.configure) {
      await plugin.configure(config[name] || {});
    }
  }
}

export async function options() {
  let options: Options = {};
  for (const name of Object.keys(plugins)) {
    const plugin = plugins[name];
    if (plugin.options) {
      options = merge(options, await plugin.options());
    }
  }

  return options;
}

export async function init(
  args: Arguments<Awaited<ReturnType<typeof options>>>
) {
  for (const name of Object.keys(plugins)) {
    const plugin = plugins[name];
    if (plugin.init) {
      await plugin.init(args);
    }
  }
}

export async function run() {
  const results: AccumulatedResults = {};
  for (const name of Object.keys(plugins)) {
    const plugin = plugins[name];
    if (plugin.run) {
      results[name] = await plugin.run(results);
    }
  }
  return results;
}
