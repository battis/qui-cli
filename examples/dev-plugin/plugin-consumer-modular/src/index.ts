import {Core} from '@battis/qui-cli.core'
import { MyPlugin } from '@examples/dev-plugin.provider';
import {Log} from '@battis/qui-cli.log'

await Core.init();
await Core.run()

Log.info(`Also: ${MyPlugin.getFoo()}`);
