import { Core } from '@qui-cli/core';
import { register } from '@qui-cli/plugin';
import * as DistributableCommand from './DistributableCommand.js';

await register(DistributableCommand);
await Core.run();
