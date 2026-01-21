import { Client, createClient, Item } from '@1password/sdk';
import { importLocal } from '@battis/import-package-json';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Shell } from '@qui-cli/shell';
import path from 'node:path';
import ora from 'ora';
import { OPConfiguration } from './Configuration.js';

export const name = '1password support';

const config: OPConfiguration = {};

let _client: Client | undefined = undefined;
async function getClient(): Promise<Client> {
  if (!_client) {
    const spinner = ora('Loading 1Password').start();
    if (config.opItem && !config.opToken) {
      const silent = Shell.isSilent();
      const showCommands = Shell.commandsShown();
      const logging = Shell.isLogging();
      Shell.configure({ silent: true, showCommands: false, logging: false });
      if (/(\d+\.)+\d/.test(Shell.exec('op -v').stdout)) {
        const { stdout, stderr } = Shell.exec(
          `op item get ${config.opAccount ? `--account "${config.opAccount}" ` : ''}--reveal --fields credential "${config.opItem}"`
        );
        if (stdout.length) {
          config.opToken = stdout.trim();
        } else {
          Log.fatal(stderr);
          process.exit(1);
        }
      } else {
        throw new Error(
          `Looking up a 1Password service account token by item identifier requires the 1Password CLI (${Colors.url('https://developer.1password.com/docs/cli')}).`
        );
      }
      Shell.configure({ silent, showCommands, logging });
    }
    if (config.opToken) {
      const pkg = await importLocal(
        path.join(import.meta.dirname, '../../package.json')
      );
      _client = await createClient({
        auth: config.opToken,
        integrationName: pkg
          .name!.replace(/^(\/|@)/, '')
          .replace(/[/@]+/g, '-'),
        integrationVersion: pkg.version!
      });
      spinner.succeed('1Password loaded');
    } else {
      spinner.fail();
      throw new Error('A 1Password service account token was not provided.');
    }
  }
  return _client;
}

export async function configure(proposal: OPConfiguration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
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
        text:
          `If 1Password secret references are stored in the environment, a ` +
          `1Password service account token is required to access the secret ` +
          `values.`
      }
    ],
    opt: {
      opAccount: {
        description:
          `1Password account to use (if signed into multiple); will use ` +
          `environment variable ${Colors.varName('OP_ACCOUNT')} if present`,
        hint: 'example.1password.com',
        default: config.opAccount
      },
      opItem: {
        description:
          `Name or ID of the 1Password API Credential item storing the ` +
          `1Password service account token; will use environment variable ` +
          `${Colors.varName('OP_ITEM')} if present. Requires the 1Password ` +
          `CLI tool (${Colors.url('https://developer.1password.com/docs/cli')})`,
        hint: '1Password unique identifier',
        default: config.opItem
      },
      opToken: {
        description:
          `1Password service account token; will use environment variable ` +
          `${Colors.varName('OP_TOKEN')} if present`,
        hint: 'token value',
        secret: true,
        default: config.opToken
      }
    }
  };
}

export async function init({
  values
}: Plugin.ExpectedArguments<typeof options>) {
  const {
    opAccount = process.env.OP_ACCOUNT,
    opItem = process.env.OP_ITEM,
    opToken = process.env.OP_TOKEN
  } = values;
  await configure({ ...values, opAccount, opItem, opToken });
}

export async function get(ref: string) {
  const client = await getClient();
  return await client.secrets.resolve(ref);
}

function explodeSecretReference(secretReference: string) {
  // eslint-disable-next-line prefer-const
  let [vault, item, section, field] = secretReference
    .replace(/^op:\/\//, '')
    .split('/');
  if (field === undefined) {
    field = section;
    section = '';
  }
  return { vault, item, section, field };
}

async function itemFrom(parts: ReturnType<typeof explodeSecretReference>) {
  const client = await getClient();
  const vault = (await client.vaults.list())
    .filter((vault) => vault.title == parts.vault)
    .shift();
  if (vault) {
    const item = (await client.items.list(vault.id))
      .filter((item) => item.title === parts.item || item.id === parts.item)
      .shift();
    if (item) {
      return await client.items.get(vault.id, item.id);
    }
  }
}

/** Requires a service account with write privileges */
export async function set({ ref, value }: { ref: string; value: string }) {
  const client = await getClient();
  const parts = explodeSecretReference(ref);
  const item = await itemFrom(parts);
  if (item) {
    const updated: Item = {
      ...item,
      fields: item.fields.map((field) => {
        const section = item.sections.find((s) => s.id === field.sectionId);
        if (parts.field === field.title || parts.field === field.id) {
          if (
            (!parts.section &&
              (field.sectionId === '' || field.sectionId === 'add more')) ||
            parts.section === section?.title ||
            parts.section === section?.id
          ) {
            return { ...field, value };
          }
        }
        return field;
      })
    };
    await client.items.put(updated);
  } else {
    throw new Error('1Password item could not be found');
  }
}
