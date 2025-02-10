import Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

export type Configuration = Plugin.Configuration & {
  root?: string;
  loadDotEnv?: boolean | string;
  setRootAsCurrentWorkingDirectory?: boolean;
};

type GetOptions = {
  key: string;
  file?: string;
};

type SetOptions = {
  key: string;
  value: string;
  file?: string;
  comment?: string;
  ifNotExists?: boolean;
};
type RemoveOptions = {
  key: string;
  file?: string;
  comment?: string;
};

const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

let root: string | undefined = undefined;
let loadDotEnv: string | boolean = true;
let setRootAsCurrentWorkingDirectory = true;

function parse(file = loadDotEnv) {
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

function exists({ key, file = '.env' }: GetOptions) {
  if (fs.existsSync(path.resolve(root || Root.path(), file))) {
    return !!parse(file)[key];
  }
  return false;
}

function get({ key, file = '.env' }: GetOptions) {
  if (fs.existsSync(path.resolve(root || Root.path(), file))) {
    return parse(file)[key];
  }
  return undefined;
}

function set({
  key,
  value,
  file = '.env',
  comment,
  ifNotExists = false
}: SetOptions) {
  const filePath = path.resolve(root || Root.path(), file);
  if (ifNotExists === false || false === exists({ key, file })) {
    let env = fs.readFileSync(filePath).toString();
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

function remove({ key, file = '.env', comment }: RemoveOptions) {
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

export const Env: Plugin.Container = {
  name,
  dependencies,
  configure: async (config?: Configuration) => {
    root = config?.root;
    loadDotEnv =
      config?.loadDotEnv !== undefined ? config.loadDotEnv : loadDotEnv;
    setRootAsCurrentWorkingDirectory =
      config?.setRootAsCurrentWorkingDirectory !== undefined
        ? config.setRootAsCurrentWorkingDirectory
        : setRootAsCurrentWorkingDirectory;
    if (setRootAsCurrentWorkingDirectory) {
      process.chdir(root || Root.path());
    }
  },
  options: () => ({}),
  init: () => {},

  parse,
  exists,
  get,
  set,
  remove
};

export { Env as default };
