# Example Sequenced Commands

A hierarchy of interdependent plugins

## Notes

This is configured as a monorepo so that each modular component is associated uniquely with a distinct package, allowing for circular reference and dependency conflict checking.

`module-a`, `module-b`, and `module-c` each define a qui-cli plugin. `command` is a command that depends on `module-a` and `module-c`. Because `module-c` depends on `module-b`, it is automatically included, and sequenced into execution between `module-a` (on which `module-b` depends) and `module-c`.

Alternatively, abjuring the safety of automatic dependency checking, multiple plugins can be defined in a single package as in `modules-def`. It is worth noting that it is vital to import the modules into their dependents from the module _in which they are registered_. For example, `ModuleD.ts` defines `ModuleD`, but `d.ts` registers the module, so the dependency is effected when `ModuleE.ts` imports `d.ts`. If multiple plugins are registered by a single package, they will be imported, configured, initialized, and run in the order in which they are registered.
