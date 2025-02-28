import { Core } from '@battis/qui-cli.core';
import '@examples/dev-sequenced-commands.module-a';
import '@examples/dev-sequenced-commands.module-c';
import '@examples/dev-sequenced-commands.modules-def/dist/f.js';

await Core.run();
