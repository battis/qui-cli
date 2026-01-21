import { register } from '@qui-cli/plugin';
import * as MyPlugin from './MyPlugin.js';

export { MyPlugin };

await register(MyPlugin);
