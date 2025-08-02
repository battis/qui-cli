import { register } from '@qui-cli/plugin';
import * as Validators from './Validators.js';

await register(Validators);
export { Validators };
