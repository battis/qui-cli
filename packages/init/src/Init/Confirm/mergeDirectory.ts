import { PathString } from '@battis/descriptive-types';
import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import path from 'path';
import * as Placeholders from '../../Placeholders.js';
import { withDiff } from './withDiff.js';
import { copyFile } from './copyFile.js';
import { FileHandlers } from '../index.js';

type Options = {
  srcPath: PathString;
  destPath: PathString;
  ignore?: (string | RegExp)[];
  fileHandlers?: Record<string, FileHandlers.FileHandler>;
  force?: boolean;
  warnings?: string[];
};

export async function mergeDirectory({
  srcPath,
  destPath,
  ignore = [],
  fileHandlers = {},
  force = false,
  warnings = []
}: Options) {
  for (const filename of fs.readdirSync(srcPath)) {
    const normalizedFilename = Placeholders.replaceAll(
      filename.replace(/^dot\./, '.')
    );
    if (normalizedFilename in fileHandlers) {
      const warning = await fileHandlers[normalizedFilename].handle({
        srcPath: path.join(srcPath, filename),
        destPath: path.join(destPath, normalizedFilename),
        force
      });
      if (warning) {
        warnings.push(warning);
      }
    } else {
      if (
        ![
          '.',
          '..',
          ...(ignore?.filter((i) => typeof i === 'string') || [])
        ].includes(filename) &&
        !(ignore || []).reduce(
          (needle, item) =>
            needle || (typeof item !== 'string' && item.test(filename)),
          false
        )
      ) {
        const srcFilePath = path.join(srcPath, filename);
        const destFilePath = path.join(destPath, normalizedFilename);
        if (fs.statSync(srcFilePath).isDirectory()) {
          const destIsFile =
            fs.existsSync(destFilePath) &&
            !fs.statSync(destFilePath).isDirectory();
          await withDiff({
            src: `A directory containing ${fs
              .readdirSync(srcFilePath)
              .map((f) => Colors.path(f))
              .join(', ')})`,
            dest: destIsFile
              ? fs.readFileSync(destFilePath, 'utf8')
              : undefined,
            identifier: Colors.path(destFilePath, Colors.keyword),
            action: async () => {
              if (destIsFile) {
                fs.rmSync(destFilePath);
              }
              if (!fs.existsSync(destFilePath)) {
                fs.mkdirSync(destFilePath, { recursive: true });
              }
              await mergeDirectory({
                srcPath: srcFilePath,
                destPath: destFilePath,
                ignore,
                fileHandlers,
                force,
                warnings
              });
            },
            force
          });
        } else {
          await copyFile({
            srcPath: srcFilePath,
            destPath: destFilePath,
            force
          });
        }
      }
    }
  }
  return warnings;
}
