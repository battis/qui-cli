import { register } from '@battis/qui-cli.plugin';
import * as OP from './dist/1Password.js';

await register(OP);

export { OP };
