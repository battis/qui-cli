import { Colors } from '@qui-cli/colors';
import { Core } from '@qui-cli/core';
import { Log } from '@qui-cli/log';

const {
  values: { foo }
} = await Core.init({
  opt: {
    foo: {
      description: 'Type of foo-ness'
    }
  }
});

await Core.run();

Log.info(
  `The value of ${Colors.optionArg('foo')} is ${Colors.quotedValue(`"${foo}"`)}`
);
