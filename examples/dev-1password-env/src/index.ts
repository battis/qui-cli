import { OP } from '@battis/qui-cli.env/1Password.js';
import { Log } from '@battis/qui-cli.log';
import { Core } from '@qui-cli/core';
import path from 'node:path';

await OP.configure({ path: path.join(import.meta.dirname, '../.env') });
await Core.run();
Log.info(Log.syntaxColor(process.env));
await OP.set({ key: 'TEST', value: Date.now().toString() });
