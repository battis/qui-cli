import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';

// process user command-line options
Core.init({ opt: { foo: { description: 'foo bar' } } });

// use plugin
Log.info(import.meta.dirname);
