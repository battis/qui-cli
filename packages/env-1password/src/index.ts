import { register } from '@qui-cli/plugin';
import * as Env from './1Password.js';

export { Env };

await register(Env);
