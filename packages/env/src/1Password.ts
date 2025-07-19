import { Client, createClient, Item } from '@1password/sdk';
import { importLocal } from '@battis/import-package-json';
import * as Plugin from '@battis/qui-cli.plugin';
import path from 'node:path';
import { Env } from './index.js';

export type Configuration = Plugin.Configuration &
  Env.Configuration & {
    serviceAccountToken?: string;
  };

const OP_SERVICE_ACCOUNT_TOKEN = 'OP_SERVICE_ACCOUNT_TOKEN';

export const name = 'env.OP';

let client: Client | undefined = undefined;

export async function configure(config: Configuration = {}) {
  const { serviceAccountToken, load = true, ...rest } = config;
  await Env.configure({ ...rest, load: false });
  const auth = serviceAccountToken || process.env[OP_SERVICE_ACCOUNT_TOKEN];
  if (auth) {
    const pkg = await importLocal(
      path.join(import.meta.dirname, '../package.json')
    );
    client = await createClient({
      auth,
      integrationName: pkg.name!.replace(/^(\/|@)/, '').replace(/[/@]+/g, '-'),
      integrationVersion: pkg.version!
    });
    if (load) {
      await parse();
    }
  } else if (load) {
    await Env.parse();
  }
}

export function options(): Plugin.Options {
  return {
    opt: {
      serviceAccountToken: {
        description: `1Password service account token (defaults to ${OP_SERVICE_ACCOUNT_TOKEN}} environment variable, if present)`
      }
    }
  };
}

export async function init({
  values
}: Plugin.ExpectedArguments<typeof options>) {
  await configure(values);
}

function isSecretReference(value: unknown) {
  return (
    value &&
    value !== null &&
    typeof value === 'string' &&
    /^op:\/\//.test(value)
  );
}

function secretReferences(parsed: Env.ParsedResult) {
  return Object.fromEntries(
    Object.entries(parsed).filter((entry) => isSecretReference(entry[1]))
  );
}

export async function parse(file?: string) {
  const parsed = await Env.parse(file);
  if (client) {
    for (const key in secretReferences(parsed)) {
      parsed[key] = await client.secrets.resolve(parsed[key]);
      process.env[key] = parsed[key];
    }
  } else if (Object.keys(secretReferences(parsed)).length) {
    throw new Error(
      'Attempt to parse .env file containing secret reference without a 1Password client'
    );
  }
  return parsed;
}

export async function get({ key, file }: Env.GetOptions) {
  return (await parse(file))[key];
}

export async function exists({
  key,
  file
}: Parameters<(typeof Env)['exists']>[0]) {
  return Env.exists({ key, file });
}

function secretFrom(secretReference: string) {
  const [vault, item, section, field] = secretReference
    .replace('op://', '')
    .split('/');
  return { vault, item, section, field };
}

async function itemFrom(secret: ReturnType<typeof secretFrom>) {
  if (client) {
    const vault = (await client.vaults.list())
      .filter((vault) => vault.title == secret.vault)
      .shift();
    if (vault) {
      const item = (await client.items.list(vault.id))
        .filter((item) => item.title === secret.item || item.id === secret.item)
        .shift();
      if (item) {
        return await client.items.get(vault.id, item.id);
      }
    }
  }
  return undefined;
}

/** Requires a service account with write privileges */
export async function set({ key, value, file, ...rest }: Env.SetOptions) {
  const prev = await Env.get({ key, file });
  if (prev && isSecretReference(prev)) {
    if (client) {
      const secret = secretFrom(prev);
      const item = await itemFrom(secret);
      if (item) {
        const updated: Item = {
          ...item,
          fields: item.fields.map((field) => {
            if (
              field.title === secret.field &&
              ((/^Section_.+/.test(secret.section) &&
                field.sectionId == secret.section.replace(/^Section_/, '')) ||
                field.sectionId ==
                  item.sections
                    .filter((section) => section.title === secret.section)
                    .shift()?.id)
            ) {
              return { ...field, value };
            }
            return field;
          })
        };
        await client.items.put(updated);
      } else {
        throw new Error('1Password item could not be found');
      }
    } else {
      throw new Error(
        'Attempt to update .env file value that is currently a secret reference without a 1Password client'
      );
    }
  } else {
    // FIXME handle creating a new secret reference
    // Issue URL: https://github.com/battis/qui-cli/issues/63
    return await Env.set({ key, value, file, ...rest });
  }
}

export const remove = Env.remove;
