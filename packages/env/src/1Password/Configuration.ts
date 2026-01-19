import * as Plugin from '@qui-cli/plugin';

export type OPConfiguration = Plugin.Configuration & {
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
