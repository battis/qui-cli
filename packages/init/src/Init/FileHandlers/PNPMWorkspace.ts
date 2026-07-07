import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import * as yaml from 'yaml';
import { merge } from '../JSON/index.js';
import * as Confirm from '../Confirm/index.js';
import { FileHandler } from './FileHandler.js';
import path from 'node:path';
import appRootPath from 'app-root-path';
import * as Placeholders from '../../Placeholders.js';

export const PNPMWorkspace: FileHandler = async ({
  srcPath,
  destPath,
  force = false
}) => {
  destPath = path.join(appRootPath.toString(), path.basename(destPath));
  let changed = false;
  if (fs.existsSync(destPath)) {
    const workspace = yaml.parse(
      Placeholders.replaceAll(fs.readFileSync(destPath, 'utf8'))
    );
    const proposal = yaml.parse(fs.readFileSync(srcPath, 'utf8'));
    for (const key in proposal) {
      const update = merge(proposal[key], workspace[key]);
      await Confirm.withDiff({
        src: update,
        dest: workspace[key],
        identifier: Colors.value(`pnpm-workspace.yaml#${key}`),
        action: () => {
          workspace[key] = update;
          changed = true;
        },
        force
      });
    }
    if (changed) {
      fs.writeFileSync(destPath, yaml.stringify(workspace));
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
    return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'pnpm-workspace.yaml'), Colors.keyword)}, please verify lockfile status`;
  }
};
