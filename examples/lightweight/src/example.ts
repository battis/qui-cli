import { Core } from '@battis/qui-cli.core';
import { Log } from '@battis/qui-cli.log';

Core.init({ opt: { foo: { description: 'foo bar' } } });
Log.info(import.meta.dirname);
