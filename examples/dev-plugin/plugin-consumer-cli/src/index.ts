import { MyPlugin } from '@examples/dev-plugin.provider';
import CLI from '@qui-cli/qui-cli';

await CLI.run();

CLI.log.info(`Also: ${MyPlugin.getFoo()}`);
