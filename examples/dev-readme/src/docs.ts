import { Core, Positionals } from '@qui-cli/core';
import { Markdown } from '@qui-cli/markdown';
import { register } from '@qui-cli/plugin';
import fs from 'node:fs';
import path from 'node:path';
import * as MyPlugin from './MyPlugin.js';

await register(MyPlugin);

Markdown.configure({
  outputPath: path.join(import.meta.dirname, '../README.md'),
  pre: fs
    .readFileSync(path.join(import.meta.dirname, '../docs/pre.md'))
    .toString(),
  overwrite: true
});
Positionals.requireNoMoreThan(0);

await Core.init();
await Markdown.run();
