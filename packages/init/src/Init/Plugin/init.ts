import { Positionals } from '@qui-cli/core';
import * as Plugin from '@qui-cli/plugin';
import { configure } from './configure.js';
import { options } from './options.js';
import * as Placeholders from '../../Placeholders.js';
import { config } from './Configuration.js';
import { kebabCase } from 'change-case';

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  configure({ name: Positionals.get('name'), ...values });
  if (config.name) {
    Placeholders.configure({
      placeholders: {
        name: [
          config.name,
          config.scope
            ? `@${kebabCase(config.scope)}/${kebabCase(config.name)}`
            : kebabCase(config.name)
        ],
        description: [config.description || '']
      }
    });
  }
}
