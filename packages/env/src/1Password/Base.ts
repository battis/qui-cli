import { Base } from '@qui-cli/plugin/dist/Plugin.js';
import { isRef } from './Secrets.js';

type Environment = Record<string, string>;
export type GetOptions = { ref: string; env: Environment };
export type SetOptions = { ref: string; value: string; env: Environment };

export interface Plugin extends Base {
  isSecretReference: typeof isRef;
  get(options: GetOptions): Promise<string | undefined>;
  set(options: SetOptions): Promise<void>;
}
