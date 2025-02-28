import { Core } from '@battis/qui-cli.core';
import { CommandPlugin } from '../index.js';

CommandPlugin.configure({ foo: 'FOO' });
await Core.init({ opt: { bar: { description: 'type of bar-ness' } } });
CommandPlugin.myCommand();
