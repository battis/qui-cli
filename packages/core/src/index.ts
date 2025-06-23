import { register } from '@battis/qui-cli.plugin';
import * as Help from './Help.js';

await register(Help);

export * as Core from './Core.js';
