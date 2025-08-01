import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';
import { MyPlugin } from '@examples/dev-plugin.provider';

await Core.run();

Log.info(`Also: ${MyPlugin.getFoo()}`);
