import { register } from '@battis/qui-cli.plugin';
import * as CommandPlugin from './CommandPlugin.js';

await register(CommandPlugin);
export { CommandPlugin };
