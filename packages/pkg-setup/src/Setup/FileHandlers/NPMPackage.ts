import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import { mergeJSONValues } from '../mergeJSONValues.js';
import * as confirm from '../confirm/index.js';
import { FileHandler } from '../Configuration.js';
import path from 'node:path';

export const NPMPackage: FileHandler = async ({
  srcPath,
  destPath,
  config,
  pkg
}) => {
  const proposal = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  let changed = false;
  for (const key in proposal) {
    const update = mergeJSONValues(proposal[key], pkg[key]);
    await confirm.withDiff(
      update,
      pkg[key],
      Colors.value(`package.${key}`),
      () => {
        pkg[key] = update;
        changed = true;
      },
      config
    );
  }
  if (changed) {
    fs.writeFileSync(destPath, JSON.stringify(pkg, null, 2));
    return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'package.json'), Colors.keyword)}, please verify package dependency and build status`;
  }
};
