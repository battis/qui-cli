import Plugin from '@battis/qui-cli.plugin';
import chalk from 'chalk';

const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

export const Colors: Plugin.Container = {
  name,
  dependencies,
  configure: async () => {},
  options: () => ({}),
  init: () => {},
  value: chalk.yellow,
  quotedValue: chalk.green,
  regexpValue: chalk.red,
  url: chalk.cyan,
  error: chalk.red.bold,
  command: chalk.magenta,
  keyword: chalk.magenta.bold
};

export { Colors as default };
