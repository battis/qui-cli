import { register } from '@battis/qui-cli.plugin';
import { MyPlugin } from '@examples/dev-plugin.provider';
import { Core } from '../../../../packages/core/dist/index.js';
import * as ConflictingPlugin from './ConflictingPlugin.js';

// no problem re-registering a plugin that has already been registered
await register(MyPlugin);

// cannot register a _different_ plugin with the same name!
await register(ConflictingPlugin);

await Core.run();
