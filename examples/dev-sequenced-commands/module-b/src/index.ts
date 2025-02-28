import { register } from '@battis/qui-cli.plugin';
import * as ModuleB from './ModuleB.js';

await register(ModuleB);
export { ModuleB };
