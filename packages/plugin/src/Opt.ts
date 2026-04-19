import { Colors } from '@qui-cli/colors';
import { ConfigMetaSet, ConfigSet, ConfigType } from 'jackspeak';

export type Documentation = {
  secret?: boolean;
};

type OptionDocumentation<D extends Documentation = Documentation> = {
  [longOption: string]: D;
};

type MetaSet<T extends ConfigType, D extends Documentation = Documentation> = {
  value: ConfigMetaSet<T, false> & OptionDocumentation<D>;
  list: ConfigMetaSet<T, true> & OptionDocumentation<D>;
};

type opt<D extends Documentation = Documentation> = MetaSet<'string', D>;
type flag<D extends Documentation = Documentation> = MetaSet<'boolean', D>;
type num<D extends Documentation = Documentation> = MetaSet<'number', D>;

type Paragraph = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  pre?: boolean;
};

export type Options<D extends Documentation = Documentation> = {
  num?: num<D>['value'];
  numList?: num<D>['list'];
  opt?: opt<D>['value'];
  optList?: opt<D>['list'];
  flag?: flag<D>['value'];
  flagList?: flag<D>['list'];
  fields?: ConfigSet;
  man?: Paragraph[];
};

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

export function documentDefaults(options: Options) {
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
            docs = `${docs}: ${
              Array.isArray(param.default)
                ? param.default.map((v) => stringify(v)).join(', ')
                : stringify(param.default)
            }`;
          }
          if (paramType === 'flag' && param.default) {
            docs = `${docs}${
              docs.length ? ', u' : 'U'
            }se ${Colors.flagArg(`--no-${paramName}`)} to disable`;
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
