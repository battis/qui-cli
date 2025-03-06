import { ConfigSetFromMetaSet, OptionsResults } from 'jackspeak';
import * as Options from './Options.js';

type FlattenConfigMetaSets<O extends Options.Options> =
  // FIXME all options are getting typed `string | undefined`
  ConfigSetFromMetaSet<'number', false, Exclude<O['num'], undefined>> &
    ConfigSetFromMetaSet<'number', true, Exclude<O['numList'], undefined>> &
    ConfigSetFromMetaSet<'string', false, Exclude<O['opt'], undefined>> &
    ConfigSetFromMetaSet<'string', false, Exclude<O['opt'], undefined>> &
    ConfigSetFromMetaSet<'string', true, Exclude<O['optList'], undefined>> &
    ConfigSetFromMetaSet<'boolean', false, Exclude<O['flag'], undefined>> &
    ConfigSetFromMetaSet<'boolean', true, Exclude<O['flagList'], undefined>> &
    Exclude<O['fields'], undefined>;

export type Arguments<O extends Options.Options> = {
  positionals: (string | undefined)[];
  values: OptionsResults<FlattenConfigMetaSets<O>>;
};

export type ExpectedArguments<H extends Options.Hook> = Arguments<
  Awaited<ReturnType<H>>
>;

export type Hook<O extends Options.Options = Options.Options> = (
  args: Arguments<O>
) => void | Promise<void>;
