import { PathString } from '@battis/descriptive-types';
import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import { withDiff } from './withDiff.js';
import * as Placeholders from '../../Placeholders.js';

type Options = {
  srcPath: PathString;
  destPath: PathString;
  force?: boolean;
};

export async function copyFile({ srcPath, destPath, force = false }: Options) {
  const src = Placeholders.replaceAll(fs.readFileSync(srcPath, 'utf8'));
  await withDiff({
    src,
    dest: fs.existsSync(destPath)
      ? fs.readFileSync(destPath, 'utf8')
      : undefined,
    identifier: Colors.path(destPath, Colors.keyword),
    action: () => fs.writeFileSync(destPath, src),
    force
  });
}
