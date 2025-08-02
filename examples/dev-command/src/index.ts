import { Log } from '@battis/qui-cli.log';
import { Colors } from '@qui-cli/colors';
import { Core } from '@qui-cli/core';

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
  `The value of ${Colors.value('foo')} is ${Colors.quotedValue(`"${foo}"`)}`
);
