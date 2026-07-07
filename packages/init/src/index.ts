import { register } from '@qui-cli/plugin';
import * as Init from './Init/index.js';
import * as Placeholders from './Placeholders.js';

await register(Init);
export { Init, Placeholders };
