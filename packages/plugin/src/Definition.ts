import pkg from '@battis/import-package-json';
import path from 'node:path';

export type Definition = {
  pathToPluginSourceDirectory: string;
  dependencyFilter?: (dependencyName: string) => boolean;
};

export type DependencyInformation = { name: string; dependencies: string[] };

export function quicliPlugins(dependencyName: string) {
  return /^@battis\/qui-cli\.(?!.*(plugin|core)).*/.test(dependencyName);
}

export async function define({
  pathToPluginSourceDirectory: src,
  dependencyFilter: filter
}: Definition): Promise<DependencyInformation> {
  const { name, dependencies = {} } = await pkg.importLocal(
    path.resolve(src, '../package.json')
  );
  if (!name) {
    throw new Error('Plugin package.json must define name');
  }
  return {
    name,
    dependencies: Object.keys(dependencies).filter(
      (name) => quicliPlugins(name) || (filter && filter(name))
    )
  };
}
