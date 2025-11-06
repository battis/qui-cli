import { Core } from '@qui-cli/core';
import { Env } from '@qui-cli/env-1password';
import { Log } from '@qui-cli/log';
import path from 'node:path';

await Env.configure({ path: path.join(import.meta.dirname, '../.env') });
await Core.run();
Log.info(Log.syntaxColor(process.env));
await Env.set({ key: 'TEST', value: Date.now().toString() });
