import { Env } from '@qui-cli/env';
import { register } from '@qui-cli/plugin';
import { Root } from '@qui-cli/root';
import path from 'node:path';
import { Core } from '../../../packages/core/dist/index.js';
import * as MyPlugin from './MyPlugin.js';

Root.configure({ root: path.dirname(import.meta.dirname) });

await register(MyPlugin);
await Core.run();

console.log({
  cwd: process.cwd(),
  root: Root.path(),
  foo: await Env.get({ key: 'FOO' })
});
