import CLI from '@battis/qui-cli'
import { MyPlugin } from '@examples/dev-plugin.provider';

await CLI.init();
await CLI.run()

CLI.log.info(`Also: ${MyPlugin.getFoo()}`);
