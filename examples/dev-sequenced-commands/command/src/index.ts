import { Core } from '@battis/qui-cli.core';
import '@examples/dev-sequenced-commands.module-a';
import '@examples/dev-sequenced-commands.module-c';

await Core.run();
