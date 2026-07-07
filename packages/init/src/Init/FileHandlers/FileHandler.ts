import { PathString } from '@battis/descriptive-types';

type Options = {
  srcPath: PathString;
  destPath: PathString;
  force?: boolean;
};
/** Optionally returns a warning to be displayed at the end of the set up process */

export type FileHandler = (
  options: Options
) => (undefined | string) | Promise<undefined | string>;
