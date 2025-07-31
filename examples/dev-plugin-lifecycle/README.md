# Example: Plugin Lifecycle

Demonstrate order in which plugin hooks are called (and the state of environment variables at each hook invocation).

# Notes

- Demonstrates the when the environment variables are loaded from .env files in the plugin lifecycle
- Too load the .env files early, `await Env.parse()` (or `await OP.parse()` if using the [1Password implementation](../dev-1password-env#readme))
