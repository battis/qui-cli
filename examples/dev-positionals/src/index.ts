import { Core, Positionals } from '@battis/qui-cli.core';

// require at least 2 and no more than 5 unnamed positional args (3 optional)
Positionals.configure({ min: 2, max: 5 });

// also require three named args
Positionals.require({ alpha: {}, beta: {}, gamma: {} });

// also require six more named args
Positionals.require({
  a: {},
  b: {},
  c: {},
  d: {},
  e: {},
  f: {}
});

await Core.run();
console.log(Positionals.get('gamma'));
