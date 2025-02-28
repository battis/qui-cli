import { register } from '@battis/qui-cli.plugin';
import * as MyPlugin from './MyPlugin.js';

await register(MyPlugin);
export { MyPlugin };
