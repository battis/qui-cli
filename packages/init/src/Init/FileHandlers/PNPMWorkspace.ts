import { Colors } from '@qui-cli/colors';
import fs from 'node:fs';
import * as yaml from 'yaml';
import { merge } from '../JSON/index.js';
import * as Confirm from '../Confirm/index.js';
import { FileHandler } from './FileHandler.js';
import path from 'node:path';
import appRootPath from 'app-root-path';
import * as Placeholders from '../../Placeholders.js';
import * as Plugin from '@qui-cli/plugin';
import prettier from 'prettier';
import { Log } from '@qui-cli/log';

export const handle: FileHandler['handle'] = async ({
  srcPath,
  destPath,
  force = false
}) => {
  destPath = path.join(appRootPath.toString(), path.basename(destPath));
  let changed = false;
  const proposal = yaml.parse(
    Placeholders.replaceAll(fs.readFileSync(srcPath, 'utf8'))
  );
  if (fs.existsSync(destPath)) {
    const workspace = yaml.parse(fs.readFileSync(destPath, 'utf8'));
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
      fs.writeFileSync(
        destPath,
        await prettier.format(yaml.stringify(workspace), {
          ...(await prettier.resolveConfig(import.meta.dirname)),
          filepath: destPath
        })
      );
      Log.info(`${Colors.path(destPath, Colors.keyword)} updated`);
    } else {
      Log.info(`${Colors.path(destPath, Colors.keyword)} up-to-date`);
    }
  } else {
    fs.writeFileSync(destPath, yaml.stringify(proposal));
    Log.info(`${Colors.path(destPath, Colors.keyword)} created`);
    return `Changes have been made to ${Colors.path(path.join(process.cwd(), 'pnpm-workspace.yaml'), Colors.keyword)}, please verify lockfile status`;
  }
};

await Plugin.register({ name: 'init.pnpm-workspace' });
