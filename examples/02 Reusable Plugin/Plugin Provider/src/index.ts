import { register } from "@qui-cli/plugin";
import * as PluginProvider from "./PluginProvider.js";

await register(PluginProvider);
export { PluginProvider };
