import { Core } from '@qui-cli/core';
import { register } from '@qui-cli/plugin';
import * as $Name from './$Name.js';

await register($Name);
await Core.run();
