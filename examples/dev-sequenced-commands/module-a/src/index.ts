import { register } from '@battis/qui-cli.plugin';
import * as ModuleA from './ModuleA.js';

await register(ModuleA);

export { ModuleA };
