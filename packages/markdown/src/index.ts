import { register } from '@qui-cli/plugin';
import * as Markdown from './Markdown.js';

export { Markdown };

await register(Markdown);
