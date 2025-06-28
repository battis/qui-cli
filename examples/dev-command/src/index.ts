import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';

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
