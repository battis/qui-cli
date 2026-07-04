import { Core } from '@qui-cli/core';

const { values, positionals } = await Core.init({
  opt: {
    anOption: {
      description: 'user-facing documentation'
    }
  }
});
await Core.run();
