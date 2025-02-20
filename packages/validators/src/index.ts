import { register } from '@battis/qui-cli.plugin';
import * as Validators from './Validators.js';

await register(Validators);
export { Validators };
