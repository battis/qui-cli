import { ConfigSetFromMetaSet, OptionsResults } from 'jackspeak';
import * as Opt from './Opt.js';

type FlattenConfigMetaSets<O extends Opt.Options> =
  // FIXME all options are getting typed `string | undefined`
  // Issue URL: https://github.com/battis/qui-cli/issues/39
  ConfigSetFromMetaSet<'number', false, Exclude<O['num'], undefined>> &
    ConfigSetFromMetaSet<'number', true, Exclude<O['numList'], undefined>> &
    ConfigSetFromMetaSet<'string', false, Exclude<O['opt'], undefined>> &
    ConfigSetFromMetaSet<'string', false, Exclude<O['opt'], undefined>> &
    ConfigSetFromMetaSet<'string', true, Exclude<O['optList'], undefined>> &
    ConfigSetFromMetaSet<'boolean', false, Exclude<O['flag'], undefined>> &
    ConfigSetFromMetaSet<'boolean', true, Exclude<O['flagList'], undefined>> &
    Exclude<O['fields'], undefined>;

export type Arguments<O extends Opt.Options> = {
  positionals: (string | undefined)[];
  values: OptionsResults<FlattenConfigMetaSets<O>>;
};

export type ExpectedArguments<H extends Opt.Hook> = Arguments<
  Awaited<ReturnType<H>>
>;

export type Hook<O extends Opt.Options = Opt.Options> = (
  args: Arguments<O>
) => void | Promise<void>;
