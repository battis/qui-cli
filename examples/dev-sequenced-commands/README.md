# dev-sequenced-commands

Note that this is configured as a monorepo so that each modular component is associated uniquely with a distinct package, allowing for circular reference and dependency conflict checking.

`module-a`, `module-b`, and `module-c` each define a qui-cli plugin. `command` is a command that depends on `module-a` and `module-c`. Because `module-c` depends on `module-b`, it is automatically included, and sequenced into execution between `module-a` (on which `module-b` depends) and `module-c`.
