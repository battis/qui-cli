import '@examples/dev-sequenced-commands.module-a';
import '@examples/dev-sequenced-commands.module-c';
import '@examples/dev-sequenced-commands.modules-def/dist/f.js';
import { Core } from '@qui-cli/core';

await Core.run();
