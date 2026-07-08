import { Core } from "@qui-cli/core";
import { register } from "@qui-cli/plugin";
import * as PluginConsumer from "./PluginConsumer.js";

await register(PluginConsumer);
await Core.run();
