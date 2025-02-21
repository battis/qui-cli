import { register } from '@battis/qui-cli.plugin';
import * as Log from './Log.js';

export * from './Levels.js';
export { Log };

await register(Log);
