import { Core } from '@qui-cli/core';
import { register } from '@qui-cli/plugin';
import * as MyPlugin from './MyPlugin.js';

await register(MyPlugin);
await Core.run();
