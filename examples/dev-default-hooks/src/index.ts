import { register } from '@qui-cli/plugin';
import { Core } from '../../../packages/core/dist/index.js';
import * as MyPlugin from './MyPlugin.js';

await register(MyPlugin);
await Core.run();
