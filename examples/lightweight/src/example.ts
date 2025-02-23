import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';

await Core.configure({ core: { allowPositionals: true } });

// process user command-line options
const args = await Core.init({
  opt: { foo: { description: 'foo bar' } }
});

// use plugin
Log.info(args);
