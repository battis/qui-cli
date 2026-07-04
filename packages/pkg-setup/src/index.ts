import * as Setup from './Setup/index.js';
import { register } from '@qui-cli/plugin';

export { Setup };

await register(Setup);
