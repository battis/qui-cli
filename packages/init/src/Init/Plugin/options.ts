import { Colors } from '@qui-cli/colors';
import { config } from './Configuration.js';

export function options() {
  return {
    man: [{ level: 1, text: 'Init Options' }],
    opt: {
      scope: {
        description: 'Scope of package to be created',
        hint: Colors.quotedValue(`"example"`),
        default: config.scope
      },
      description: {
        description: 'Description of package',
        default: config.description
      }
    },
    flag: {
      enclosingDirectory: {
        description: 'Create enclosing directory for project',
        default: config.enclosingDirectory
      },
      force: {
        description: `Force initialization, overwriting files without confirmation`,
        short: 'f',
        default: config.force
      }
    }
  };
}
