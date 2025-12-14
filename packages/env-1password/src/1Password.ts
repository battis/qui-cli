import { Client, createClient, Item } from '@1password/sdk';
import { importLocal } from '@battis/import-package-json';
import { Colors } from '@qui-cli/colors';
import { Env } from '@qui-cli/env';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Shell } from '@qui-cli/shell';
import path from 'node:path';

export type Configuration = Plugin.Configuration &
  Env.Configuration & {
    /** 1Password service account token */
    opToken?: string;
    /** 1Password account to use (if signed into multiple) */
    opAccount?: string;
    /**
     * Name or ID of the 1Password API Credential item storing the 1Password
     * service account token
     */
    opItem?: string;
    /** @deprecated Use {@link opToken} */
    serviceAccountToken?: string;
  };

export const name = 'env-1password';

let client: Client | undefined = undefined;

const config: Configuration = {};

export async function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
  config.opToken = config.opToken || config.serviceAccountToken;
  await Env.configure({ ...config, load: false });
  if (config.opItem && !config.opToken) {
    const silent = Shell.isSilent();
    const showCommands = Shell.commandsShown();
    Shell.configure({ silent: true, showCommands: false });
    const { stdout, stderr } = Shell.exec(
      `op item get ${config.opAccount ? `--account "${config.opAccount}" ` : ''}--reveal "${config.opItem}"`
    );
    if (stdout.length) {
      config.opToken = stdout;
    } else {
      Log.fatal(stderr);
      process.exit(1);
    }
    Shell.configure({ silent, showCommands });
  }
  if (config.opToken) {
    const pkg = await importLocal(
      path.join(import.meta.dirname, '../package.json')
    );
    client = await createClient({
      auth: config.opToken,
      integrationName: pkg.name!.replace(/^(\/|@)/, '').replace(/[/@]+/g, '-'),
      integrationVersion: pkg.version!
    });
    if (config.load) {
      await parse();
    }
  } else if (config.load) {
    await Env.parse();
  }
}

export function options(): Plugin.Options {
  return {
    man: [
      {
        level: 1,
        text: '1Password environment integration'
      },
      {
        text: 'Store 1Password secret references in your environment, rather than the actual secrets.'
      },
      {
        text: `If 1Password secret references are stored in the environment, a 1Password service account token is required to access the secret values, which will be loaded into ${Colors.value(
          'process.env'
        )}. The service account token can be passed directly as the ${Colors.optionArg(
          '--opToken'
        )} argument (e.g. ${Colors.command(
          `${Colors.keyword('example')} --opToken "(${Colors.keyword(
            'op'
          )} item get SERVICE_ACCOUNT_TOKEN)"`
        )}) or, if the 1Password CLI tool is also installed, by simply passing the name or ID of the API Credential in your 1Password vault that holds the service account token (e.g. ${Colors.command(`${Colors.keyword('example')} --opItem SERVICE_ACCOUNT_TOKEN`)}). If you are signed into multiple 1Password account, use the ${Colors.optionArg('--opAccount')} argument to specify the account containing the token.`
      },
      { text: Colors.url('https://developer.1password.com/docs/cli') }
    ],
    opt: {
      opAccount: {
        description: `1Password account to use (if signed into multiple)`,
        hint: 'example.1password.com',
        default: config.opAccount
      },
      opItem: {
        description: `Name or ID of the 1Password API Credential item storing the 1Password service account token`,
        default: config.opItem
      },
      opToken: {
        description: `1Password service account token`,
        secret: true,
        default: config.opToken || config.serviceAccountToken
      },
      serviceAccountToken: {
        description: `1Password service account token`,
        hint: 'Deprecated',
        secret: true,
        default: config.serviceAccountToken
      }
    }
  };
}

export async function init({
  values
}: Plugin.ExpectedArguments<typeof options>) {
  await configure(values);
  parse();
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
