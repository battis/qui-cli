import { register } from '@qui-cli/plugin';
import * as ModuleB from './ModuleB.js';

await register(ModuleB);
export { ModuleB };
