import { register } from '@battis/qui-cli.plugin';
import * as Env from './Env.js';

await register(Env);

export { Env };
