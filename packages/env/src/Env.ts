import * as Plugin from '@battis/qui-cli.plugin';
import '@battis/qui-cli.root';
import { Root } from '@battis/qui-cli.root';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

export type Configuration = Plugin.Configuration & {
  root?: string;
  load?: boolean;
  path?: string;
};

export const name = 'env';

let root: string | undefined = undefined;
let load: boolean = true;
let pathToEnv = '.env';

export async function configure(config: Configuration = {}) {
  root = Plugin.hydrate(config.root, root);
  load = Plugin.hydrate(config.load, load);
  pathToEnv = Plugin.hydrate(config.path, pathToEnv);

  if (load) {
    await parse();
  }
}

export async function parse(file = pathToEnv) {
  const filePath = path.resolve(
    root || Root.path(),
    typeof file === 'string' ? file : '.env'
  );
  if (fs.existsSync(filePath)) {
    const env = dotenv.config({ path: filePath });
    if (env.error) {
      throw env.error;
    }
    return env.parsed || {};
  }
  return {};
}

type GetOptions = {
  key: string;
  file?: string;
};

export async function get({ key, file = pathToEnv }: GetOptions) {
  if (fs.existsSync(path.resolve(root || Root.path(), file))) {
    return (await parse(file))[key];
  }
  return undefined;
}

export async function exists({ key, file = pathToEnv }: GetOptions) {
  if (fs.existsSync(path.resolve(root || Root.path(), file))) {
    return !!(await parse(file))[key];
  }
  return false;
}

type SetOptions = {
  key: string;
  value: string;
  file?: string;
  comment?: string;
  ifNotExists?: boolean;
};

export async function set({
  key,
  value,
  file = pathToEnv,
  comment,
  ifNotExists = false
}: SetOptions) {
  const filePath = path.resolve(root || Root.path(), file);
  if (ifNotExists === false || false === (await exists({ key, file }))) {
    let env = '';
    if (fs.existsSync(filePath)) {
      env = fs.readFileSync(filePath).toString();
    }
    const pattern = new RegExp(`^${key}=.*$`, 'm');
    if (/[\s=]/.test(value)) {
      value = `"${value}"`;
    }
    if (pattern.test(env)) {
      env = env.replace(pattern, `${key}=${value}`);
    } else {
      env = `${env.trim()}\n${
        comment ? `\n# ${comment}\n` : ''
      }${key}=${value}\n`;
    }
    fs.writeFileSync(filePath, env);
  }
}

type RemoveOptions = {
  key: string;
  file?: string;
  comment?: string;
};

export async function remove({
  key,
  file = pathToEnv,
  comment
}: RemoveOptions) {
  const filePath = path.resolve(root || Root.path(), file);
  if (fs.existsSync(filePath)) {
    const env = fs.readFileSync(filePath).toString();
    const pattern = new RegExp(`${key}=.*\\n`);
    if (pattern.test(env)) {
      fs.writeFileSync(
        filePath,
        env.replace(pattern, comment ? `# ${comment}\n` : '')
      );
    }
  }
}
