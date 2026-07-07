import { PathString } from '@battis/descriptive-types';
import * as Plugin from '@qui-cli/plugin';
import * as FileHandlers from '../FileHandlers/index.js';

export type Configuration = Plugin.Configuration & {
  /** Name (without scope) for the project being initialized */
  name?: string;

  /** Scope for the project being initialized */
  scope?: string;

  description?: string;

  /** Directory of `packageName` to search for configuration templates */
  template?: PathString;

  /**
   * Whether or not to create an enclosing directory for the project being
   * initialized (or just initialize in the current working directory)
   */
  enclosingDirectory?: boolean;

  /**
   * Define custom file handling behavior (`package.json` and
   * `pnpm-workspace.yaml` are merged together rather than replaced by default)
   */
  fileHandlers?: Record<string, FileHandlers.FileHandler>;

  /** File names or patterns to ignore in `template` (`'.DS_Store'` by default) */
  ignore?: (string | RegExp)[];

  /** Run without confirmation, accepting proposed changes automatically */
  force?: boolean;
};

export const config: Configuration = {
  enclosingDirectory: true,
  template: 'template',
  delimiter: ',',
  fileHandlers: {
    'package.json': FileHandlers.NPMPackage,
    'pnpm-workspace.yaml': FileHandlers.PNPMWorkspace
  },
  ignore: ['.DS_Store'],
  force: false
};
