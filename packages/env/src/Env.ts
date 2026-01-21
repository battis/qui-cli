import * as Plugin from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { OP } from './1Password/index.js';

export type Configuration = Plugin.Configuration & {
  /**
   * Optional root for calculating relative paths to `.env` files. If undefined,
   * falls back to the path defined by
   * [@qui-cli/root](https://www.npmjs.com/package/@qui-cli/root).
   */
  root?: string;
  /**
   * Whether or not to load the `.env` file into `process.env` immediately.
   * Defaults to `true`.
   */
  load?: boolean;
  /** Path to desired `.env` file relative to `root`. Defaults to `'.env'`; */
  path?: string;
};

export const name = 'env';

const config: Configuration = {
  load: true,
  path: '.env'
};

export async function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
  if (config.load) {
    await parse();
  }
}

export async function init() {
  parse();
}

export type ParsedResult = dotenv.DotenvParseOutput;

function toFilePath(file = '.env') {
  return path.resolve(config.root || Root.path(), file);
}

export async function parse(file = config.path): Promise<ParsedResult> {
  const filePath = toFilePath(file);
  if (fs.existsSync(filePath)) {
    const env = dotenv.config({ path: filePath, quiet: true });
    if (env.error) {
      throw env.error;
    }
    return env.parsed || {};
  }
  return {};
}

export type GetOptions = {
  key: string;
  file?: string;
};

export async function get({ key, file = config.path || '.env' }: GetOptions) {
  if (fs.existsSync(toFilePath(file))) {
    const env = await parse(file);
    if (OP.isSecretReference(env[key])) {
      if (OP.get) {
        return await OP.get({ ref: env[key], env });
      } else {
        throw new Error(
          `Attempt to read environment variable ${key} that is a 1Password secret reference without @1password/sdk installed.`
        );
      }
    }
    return env[key];
  }
  return undefined;
}

export async function exists({ key, file = config.path }: GetOptions) {
  if (fs.existsSync(toFilePath(file))) {
    return !!(await parse(file))[key];
  }
  return false;
}

export type SetOptions = {
  /** Name of environment variable to set */
  key: string;
  /** Value to set */
  value: string;
  /** Path to the .env file */
  file?: string;
  /** A comment included in the .env file above the variable */
  comment?: string;
  /** Only set key=value if key is not already set */
  ifNotExists?: boolean;
};

export async function set({
  key,
  value,
  file = config.path,
  comment,
  ifNotExists = false
}: SetOptions) {
  const filePath = toFilePath(file);
  const env = dotenv.config({ path: filePath, quiet: true }).parsed || {};
  const { [key]: prev } = env;
  if (ifNotExists === false || !prev) {
    if (prev && OP.isSecretReference(prev)) {
      if (OP.set) {
        await OP.set({ ref: prev, value, env });
      } else {
        throw new Error(
          `Attmept to update environment variable ${key} that is a 1Password secret reference without installing @1password/sdk`
        );
      }
    } else {
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
}

export type RemoveOptions = {
  key: string;
  file?: string;
  comment?: string;
};

export async function remove({
  key,
  file = config.path || '.env',
  comment
}: RemoveOptions) {
  const filePath = path.resolve(config.root || Root.path(), file);
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
