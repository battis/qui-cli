import { register } from '@battis/qui-cli.plugin';
import { Core } from '@battis/qui-cli.core';
import * as MyPlugin from './MyPlugin.js';

await register(MyPlugin);
await Core.run();
