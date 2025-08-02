import { MyPlugin } from '@examples/dev-plugin.provider';
import { Core } from '@qui-cli/core';
import { Log } from '@qui-cli/log';

await Core.run();

Log.info(`Also: ${MyPlugin.getFoo()}`);
