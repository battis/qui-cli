import { PathString } from '@battis/descriptive-types';
import * as Plugin from '@qui-cli/plugin';
import { IPackageJson } from 'package-json-type';

type Options = {
  srcPath: PathString;
  destPath: PathString;
  config: Configuration;
  pkg: IPackageJson;
};

/** Optionally returns a warning to be displayed at the end of the set up process */
export type FileHandler = (
  options: Options
) => (undefined | string) | Promise<undefined | string>;

export type Configuration = Plugin.Configuration & {
  /** Name of the package to set up */
  packageName?: string;
  /** Directory of `packageName` to search for configuration templates */
  setupDir?: PathString;
  /**
   * Define custom file handling behavior (`package.json` and
   * `pnpm-workspace.yaml` are merged together rather than replaced by default)
   */
  fileHandlers?: Record<string, FileHandler>;
  /** File names or patterns to ignore in `setupDir` (`'.DS_Store'` by default) */
  ignore?: (string | RegExp)[];
  /** Run without confirmation, accepting proposed changes automatically */
  force?: boolean;
};
