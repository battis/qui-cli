import { register } from '@qui-cli/plugin';
import * as Create from './Create.js';
import { Core } from '@qui-cli/core';

await register(Create);
await Core.run();
