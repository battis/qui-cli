import { Core } from '@battis/qui-cli.core';
import { Env } from '@battis/qui-cli.env';
import { Log } from '@battis/qui-cli.log';
import path from 'node:path';

await Env.configure({ path: path.join(import.meta.dirname, '../.env') });
await Core.run();
Log.info(Log.syntaxColor(process.env));
