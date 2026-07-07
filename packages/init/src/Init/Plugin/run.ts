import { Log } from '@qui-cli/log';
import fs from 'node:fs';
import path from 'path';
import { config } from './Configuration.js';
import * as Confirm from '../Confirm/index.js';

export async function run() {
  if (!config.template) {
    throw new Error(`A template source must be provided`);
  }

  let destPath = process.cwd();
  if (config.enclosingDirectory) {
    if (!config.name) {
      throw new Error(`A directory name must be provided`);
    }
    destPath = path.join(destPath, config.name);
    fs.mkdirSync(destPath, { recursive: true });
  }
  const warnings = await Confirm.mergeDirectory({
    srcPath: config.template,
    destPath,
    ...config
  });
  if (warnings.length) {
    warnings.map((warning) => Log.warning(warning));
  }

  return true;
}
