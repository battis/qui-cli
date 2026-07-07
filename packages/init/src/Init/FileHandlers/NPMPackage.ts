import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import { merge } from '../JSON/index.js';
import * as Confirm from '../Confirm/index.js';
import { FileHandler } from './FileHandler.js';
import path from 'node:path';
import { IPackageJson } from 'package-json-type';
import * as Placeholders from '../../Placeholders.js';

export const NPMPackage: FileHandler = async ({
  srcPath,
  destPath,
  force = false
}) => {
  const pkg: IPackageJson = fs.existsSync(destPath)
    ? JSON.parse(fs.readFileSync(destPath, 'utf8'))
    : {};
  const proposal = JSON.parse(
    Placeholders.replaceAll(fs.readFileSync(srcPath, 'utf8'))
  );
  let changed = false;
  for (const key in proposal) {
    const update = merge(proposal[key], pkg[key]);
    await Confirm.withDiff({
      src: update,
      dest: pkg[key],
      identifier: Colors.value(`package.${key}`),
      action: () => {
        pkg[key] = update;
        changed = true;
      },
      force
    });
  }
  if (changed) {
    fs.writeFileSync(destPath, JSON.stringify(pkg, null, 2));
    return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'package.json'), Colors.keyword)}, please verify package dependency and build status`;
  }
};
