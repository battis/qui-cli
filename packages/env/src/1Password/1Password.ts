import { Client, createClient, Item } from '@1password/sdk';
import { importLocal } from '@battis/import-package-json';
import { Colors } from '@qui-cli/colors';
import { Log } from '@qui-cli/log';
import * as Plugin from '@qui-cli/plugin';
import { Shell } from '@qui-cli/shell';
import path from 'node:path';
import ora from 'ora';
import * as Base from './Base.js';
import * as Secrets from './Secrets.js';

export type Configuration = Plugin.Configuration & {
  /**
   * 1Password service account token; will use the environment variable OP_TOKEN
   * if present
   */
  opToken?: string;
  /**
   * Name or ID of the 1Password API Credential item storing the 1Password
   * service account token; will use environment variable OP_ITEM if present
   */
  opItem?: string;
  /**
   * 1Password account to use (if signed into multiple); will use environment
   * variable OP_ACCOUNT if present
   */
  opAccount?: string;
};

export class OP implements Base.Plugin {
  [key: string]: unknown;

  public readonly name = 'env.1password';

  private config: Configuration = {};

  private _client: Client | undefined = undefined;
  private async getClient(): Promise<Client> {
    if (!this._client) {
      const spinner = ora('Loading 1Password').start();
      if (this.config.opItem && !this.config.opToken) {
        const silent = Shell.isSilent();
        const showCommands = Shell.commandsShown();
        const logging = Shell.isLogging();
        Shell.configure({ silent: true, showCommands: false, logging: false });
        if (/(\d+\.)+\d/.test(Shell.exec('op -v').stdout)) {
          const { stdout, stderr } = Shell.exec(
            `op item get ${this.config.opAccount ? `--account "${this.config.opAccount}" ` : ''}--reveal --fields credential "${this.config.opItem}"`
          );
          if (stdout.length) {
            this.config.opToken = stdout.trim();
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
      if (this.config.opToken) {
        const pkg = await importLocal(
          path.join(import.meta.dirname, '../../package.json')
        );
        this._client = await createClient({
          auth: this.config.opToken,
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
    return this._client;
  }

  public configure(proposal: Configuration = {}) {
    for (const key in proposal) {
      if (proposal[key] !== undefined) {
        this.config[key] = proposal[key];
      }
    }
  }

  private configureFromEnv(env: Record<string, string>) {
    this.configure({
      opAccount: env.OP_ACCOUNT,
      opItem: env.OP_ITEM,
      opToken: env.OP_TOKEN
    });
  }

  public options(): Plugin.Options {
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
          default: this.config.opAccount
        },
        opItem: {
          description:
            `Name or ID of the 1Password API Credential item storing the ` +
            `1Password service account token; will use environment variable ` +
            `${Colors.varName('OP_ITEM')} if present. Requires the 1Password ` +
            `CLI tool (${Colors.url('https://developer.1password.com/docs/cli')})`,
          hint: '1Password unique identifier',
          default: this.config.opItem
        },
        opToken: {
          description:
            `1Password service account token; will use environment variable ` +
            `${Colors.varName('OP_TOKEN')} if present`,
          hint: 'token value',
          secret: true,
          default: this.config.opToken
        }
      }
    };
  }

  public async init({ values }: Plugin.ExpectedArguments<typeof this.options>) {
    await this.configure(values);
  }

  public async get({ ref, env }: Base.GetOptions) {
    this.configureFromEnv(env);
    return await (await this.getClient()).secrets.resolve(ref);
  }

  public isSecretReference = Secrets.isRef;

  private async itemFrom(parts: Secrets.Reference) {
    const client = await this.getClient();
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
  public async set({ ref, value, env }: Base.SetOptions) {
    this.configureFromEnv(env);
    const client = await this.getClient();
    const parts = Secrets.explodeRef(ref);
    const item = await this.itemFrom(parts);
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
}
