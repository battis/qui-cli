import { Core } from '@qui-cli/core';
import '@qui-cli/env/1Password.js';
import { register } from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import path from 'node:path';
import * as MyPlugin from '../MyPlugin.js';

Root.configure({ root: path.resolve(import.meta.dirname, '../..') });
await register(MyPlugin);
await Core.run();
