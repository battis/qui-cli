import { MyPlugin } from '@examples/dev-peer-of-peer.plugin';
import { Core } from '@qui-cli/core';
import { Root } from '@qui-cli/root';
import path from 'node:path';

Root.configure({ root: path.dirname(import.meta.dirname) });
await Core.run();
console.log(MyPlugin.getConfiguration());
