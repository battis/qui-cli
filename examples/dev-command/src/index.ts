import { Core } from '@battis/qui-cli.core';
import { register } from '@battis/qui-cli.plugin';
import * as Command from './Command.js';

await register(Command);
await Core.run();
