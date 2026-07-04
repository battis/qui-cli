import { PathString } from '@battis/descriptive-types';
import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import { withDiff } from './withDiff.js';
import { config } from '../Plugin.js';

export async function copy(srcPath: PathString, destPath: PathString) {
  await withDiff(
    fs.existsSync(srcPath) ? fs.readFileSync(srcPath, 'utf8') : undefined,
    fs.existsSync(destPath) ? fs.readFileSync(destPath, 'utf8') : undefined,
    Colors.path(destPath, Colors.keyword),
    () => fs.copyFileSync(srcPath, destPath),
    config
  );
}
