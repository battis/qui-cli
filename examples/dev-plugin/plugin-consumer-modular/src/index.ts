import { Log } from '@battis/qui-cli.log';
import { MyPlugin } from '@examples/dev-plugin.provider';
import { Core } from '@qui-cli/core';

await Core.run();

Log.info(`Also: ${MyPlugin.getFoo()}`);
