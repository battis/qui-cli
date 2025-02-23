import Package from '@battis/import-package-json';
import fs from 'node:fs';
import path from 'node:path';
import { Arguments } from './Arguments.js';
import { Options, merge } from './Options.js';
import * as Plugin from './Plugin.js';

export type RegisteredPlugin = Plugin.Base & {
  package: {
    path: string;
    name: string;
    version: string;
    dependencies: Record<string, string>;
  };
};

const plugins: Record<string, RegisteredPlugin> = {};
let sorted: (keyof typeof plugins)[] | undefined = undefined;

export function builtinPlugins(name: string) {
  return /^@battis\/qui-cli\.(?!.*(core|plugin)).*/.test(name);
}

export async function register(
  plugin: Plugin.Base,
  matchPluginDependencies = builtinPlugins
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

  const peerDependencies = pkg.peerDependencies || {};

  const registree: RegisteredPlugin = {
    ...plugin,
    package: {
      path: pkgPath,
      name: pkg.name,
      version: pkg.version,
      dependencies: Object.keys(peerDependencies)
        .filter(matchPluginDependencies)
        .reduce(
          (dependencies, name) => {
            dependencies[name] = peerDependencies[name];
            return dependencies;
          },
          {} as Record<string, string>
        )
    }
  };

  if (registree.name in plugins) {
    if (
      plugins[registree.name].package.name === registree.package.name &&
      plugins[registree.name].package.version === registree.package.version &&
      plugins[registree.name].package.path === registree.package.path
    ) {
      return;
    }
    throw new Error(
      `${registree.package.name}@${registree.package.version} attempted to register as "${registree.name}" (${registree.package.path}), but ${plugins[registree.name].package.name}@${plugins[registree.name].package.version} is already registered as "${registree.name}" (${plugins[registree.name].package.path}).`
    );
  }
  plugins[registree.name] = registree;
}

function sort() {
  if (!sorted || sorted.length !== Object.keys(plugins).length) {
    sorted = [];
    const unsorted = Object.keys(plugins);
    while (unsorted.length) {
      const name = unsorted.shift();
      if (name) {
        const plugin = plugins[name];
        let satisfied = true;
        for (const dependency in plugin.package.dependencies) {
          if (!sorted.includes(dependency)) {
            let dependencyName: string | undefined = undefined;
            for (const key in plugins) {
              if (plugins[key].package.name === dependency) {
                dependencyName = key;
              }
            }
            if (!dependencyName) {
              throw new Error(
                `Plugin "${name}" depends on ${dependency}@${plugin.package.dependencies[dependency]} which has not been registered.`
              );
            }
          }
        }
        if (!satisfied) {
          unsorted.push(name);
        } else {
          sorted.push(name);
        }
      }
    }
  }
}

export function registered() {
  return Object.keys(plugins).map((name) => ({
    name,
    package: plugins[name].package
  }));
}

export type Configuration = {
  [key: keyof typeof plugins]: Plugin.Configuration;
};

export async function configure(config: Configuration = {}) {
  sort();
  if (sorted) {
    for (const name of sorted) {
      const plugin = plugins[name];
      if (plugin.configure) {
        await plugin.configure(config[name] || {});
      }
    }
  }
}

export async function options() {
  sort();
  let options: Options = {};
  if (sorted) {
    for (const name of sorted) {
      const plugin = plugins[name];
      if (plugin.options) {
        options = merge(options, await plugin.options());
      }
    }
  }
  return options;
}

export async function init(
  args: Arguments<Awaited<ReturnType<typeof options>>>
) {
  sort();
  if (sorted) {
    for (const name of sorted) {
      const plugin = plugins[name];
      if (plugin.init) {
        await plugin.init(args);
      }
    }
  }
}
