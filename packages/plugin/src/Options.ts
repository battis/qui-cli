import { Colors } from '@qui-cli/colors';
import { ConfigMetaSet, ConfigSet, ConfigType } from 'jackspeak';

type DocumentationOptions = {
  [longOption: string]: {
    env?: string;
    secret?: boolean;
  };
};

type MetaSet<T extends ConfigType> = {
  value: ConfigMetaSet<T, false> & DocumentationOptions;
  list: ConfigMetaSet<T, true> & DocumentationOptions;
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

function stringify(value: string | number | boolean | RegExp) {
  switch (typeof value) {
    case 'string':
      return Colors.quotedValue(`"${value}"`);
    case 'object':
      return Colors.regexpValue(value);
    default:
      return Colors.value(value);
  }
}

export function appendDefaultDocumentation(options: Options) {
  let paramType: keyof Options;
  for (paramType in options) {
    if (paramType !== 'man' && paramType !== 'fields') {
      const params = options[paramType];
      if (params) {
        let paramName: keyof typeof params;
        for (paramName in params) {
          const param = params[paramName];
          let docs = '';
          if (param.default !== undefined && !param.secret) {
            if (!docs.length) {
              docs = 'Default';
            }
            docs = `${docs}: ${Array.isArray(param.default) ? param.default.map((v) => stringify(v)) : stringify(param.default)}`;
          }
          if (paramType === 'flag' && param.default) {
            docs = `${docs}${docs.length ? ', ' : ''}use ${Colors.flagArg(`--no-${paramName}`)} to disable`;
          }
          if (docs.length) {
            if (param.description?.length) {
              param.description = `${param.description} (${docs})`;
            } else {
              param.description = docs;
            }
          }
        }
      }
    }
  }
  return options;
}

export type Hook = () => Options | Promise<Options>;
