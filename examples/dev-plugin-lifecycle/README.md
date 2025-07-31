# Example: Plugin Lifecycle

Demonstrate order in which plugin hooks are called (and the state of environment variables at each hook invocation).

## Notes

- Demonstrates the when the environment variables are loaded from .env files in the plugin lifecycle
- Too load the .env files early, `await Env.parse()` (or `await OP.parse()` if using the [1Password implementation](../dev-1password-env#readme))

## Expected Output

```console
> dev-plugin-lifecycle --myOptParam "value from command line"

{
  "plugin imported": {
    "process.env.MY_PARAM": "undefined",
    "myOptParam": "undefined"
  }
}
{
  "options() hook": {
    "process.env.MY_PARAM": "undefined",
    "myOptParam": "undefined"
  }
}
{
  "init() hook": {
    "process.env.MY_PARAM": "value loaded from .env file",
    "myOptParam": "undefined"
  }
}
{
  "configure() called by init()": {
    "process.env.MY_PARAM": "value loaded from .env file",
    "myOptParam": "undefined"
  }
}
{
  "run() hook": {
    "process.env.MY_PARAM": "value loaded from .env file",
    "myOptParam": "value from command line"
  }
}
```
