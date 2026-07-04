import { Core } from '@qui-cli/core';
import { register } from '@qui-cli/plugin';
import * as $Command from './$Command.js';

await register($Command);
await Core.run();
