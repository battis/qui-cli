import { register } from '@battis/qui-cli.plugin';
import * as Help from './Help.js';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

await register(JackSpeak);
await register(Help);
await register(Positionals);

export * as Core from './Core.js';
export { Help, JackSpeak, Positionals };
