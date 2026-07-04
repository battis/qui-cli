import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import * as yaml from 'yaml';
import { mergeJSONValues } from '../mergeJSONValues.js';
import * as confirm from '../confirm/index.js';
import { FileHandler } from '../Configuration.js';
import path from 'node:path';
import appRootPath from 'app-root-path';

export const PNPMWorkspace: FileHandler = async ({
  srcPath,
  destPath,
  config
}) => {
  destPath = path.join(appRootPath.toString(), path.basename(destPath));
  let changed = false;
  if (fs.existsSync(destPath)) {
    const workspace = yaml.parse(fs.readFileSync(destPath, 'utf8'));
    const proposal = yaml.parse(fs.readFileSync(srcPath, 'utf8'));
    for (const key in proposal) {
      const update = mergeJSONValues(proposal[key], workspace[key]);
      await confirm.withDiff(
        update,
        workspace[key],
        Colors.value(`pnpm-workspace.yaml#${key}`),
        () => {
          workspace[key] = update;
          changed = true;
        },
        config
      );
    }
    if (changed) {
      fs.writeFileSync(destPath, yaml.stringify(workspace));
    }
  } else {
    fs.copyFileSync(srcPath, destPath);
    return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'pnpm-workspace.yaml'), Colors.keyword)}, please verify lockfile status`;
  }
};
