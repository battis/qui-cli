import { register } from '@qui-cli/plugin';
import * as Help from './Help.js';
import * as JackSpeak from './JackSpeak.js';
import * as Positionals from './Positionals.js';

export * as Core from './Core.js';
export { Help, JackSpeak, Positionals };

await register(Help);
await register(JackSpeak);
await register(Positionals);
