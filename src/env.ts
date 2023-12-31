import AppRootPath from 'app-root-path';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

function parse(name = '.env') {
  const env = dotenv.config({
    path: path.resolve(AppRootPath.toString(), name)
  });
  if (!env.error) {
    return env.parsed;
  } else {
    throw env.error;
  }
}

type GetOptions = {
  key: string;
  file?: string;
};

const get = ({ key, file = '.env' }: GetOptions) => parse(file)[key];

const exists = ({ key, file = '.env' }: GetOptions) => !!parse(file)[key];

type SetOptions = {
  key: string;
  value: string;
  file?: string;
  comment?: string;
  ifNotExists?: boolean;
};

type DeleteOptions = {
  key: string;
  file?: string;
  comment?: string;
};

function readFile(file: string) {
  const filePath = path.resolve(AppRootPath.toString(), file);
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(file: string, contents: string) {
  fs.writeFileSync(path.resolve(AppRootPath.toString(), file), contents);
}

export default {
  parse,
  exists,
  get,

  set: function({
    key,
    value,
    file = '.env',
    comment,
    ifNotExists = false
  }: SetOptions) {
    if (get({ key, file }) === undefined) {
      let env = readFile(file);
      const pattern = new RegExp(`${key}=.*\\n`);
      if (/[\s=]/.test(value)) {
        value = `"${value}"`;
      }
      if (pattern.test(env)) {
        env = env.replace(pattern, `${key}=${value}\n`);
      } else {
        env = `${env.trim()}\n${comment ? `\n# ${comment}\n` : ''
          }${key}=${value}\n`;
      }
      writeFile(file, env);
    }
  },

  delete: function({ key, file = '.env', comment }: DeleteOptions) {
    const env = readFile(file);
    const pattern = new RegExp(`${key}=.*\\n`);
    if (pattern.test(env)) {
      writeFile(file, env.replace(pattern, comment ? `# ${comment}\n` : ''));
    }
  }
};
