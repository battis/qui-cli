import { ConfigMetaSet, ConfigSet, ConfigType } from 'jackspeak';

/*
 * TODO `env` field for options and flags
   Issue URL: https://github.com/battis/qui-cli/issues/41
 *   Name the environment variable to use as default value on init, if available
 */

/*
 * TODO `secret` (or similar) field for options and flags
   Issue URL: https://github.com/battis/qui-cli/issues/40
 *   Indicate that the actual default value should not be displayed in usage (e.g. for an `env` value)
 */

type MetaSet<T extends ConfigType> = {
  value: ConfigMetaSet<T, false>;
  list: ConfigMetaSet<T, true>;
};

type opt = MetaSet<'string'>;
type flag = MetaSet<'boolean'>;
type num = MetaSet<'number'>;

type Paragraph = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  pre?: boolean;
};

export type Options = {
  num?: num['value'];
  numList?: num['list'];
  opt?: opt['value'];
  optList?: opt['list'];
  flag?: flag['value'];
  flagList?: flag['list'];
  fields?: ConfigSet;
  man?: Paragraph[];
};

export function merge<A extends Options = Options, B extends Options = Options>(
  a: A,
  b: B
): A & B {
  return {
    num: { ...a.num, ...b.num },
    numList: { ...a.numList, ...b.numList },
    opt: { ...a.opt, ...b.opt },
    optList: { ...a.optList, ...b.optList },
    flag: { ...a.flag, ...b.flag },
    flagList: { ...a.flagList, ...b.flagList },
    fields: { ...a.fields, ...b.fields },
    man: [...(a.man || []), ...(b.man || [])]
  } as A & B;
}

export type Hook = () => Options | Promise<Options>;
