import { Colors } from '@qui-cli/colors';
import { ConfigOption, ConfigSet, ConfigType, ValidOptions } from 'jackspeak';

export type Metadata = Record<string, unknown>;

export type QCMetadata = { secret?: boolean };

export type QCConfigOption<
  Type extends ConfigType,
  Multiple extends boolean,
  AdditionalMetadata extends Metadata = QCMetadata,
  Options extends undefined | ValidOptions<Type> =
    undefined | ValidOptions<Type>
> = ConfigOption<Type, Multiple, Options> & QCMetadata & AdditionalMetadata;

export type QCConfigOptionMeta<
  Type extends ConfigType,
  Multiple extends boolean,
  AdditionalMetadata extends Metadata = QCMetadata,
  QCOption extends QCConfigOption<Type, Multiple, AdditionalMetadata> =
    QCConfigOption<Type, Multiple, AdditionalMetadata>
> = Pick<Partial<QCOption>, 'type'> & Omit<QCOption, 'type'>;

export type QCConfigMetaSet<
  Type extends ConfigType,
  Multiple extends boolean,
  AdditionalMetadata extends Metadata = QCMetadata
> = {
  [longOption: string]: QCConfigOptionMeta<Type, Multiple, AdditionalMetadata>;
};

export type Paragraph = {
  /** Text to show */
  text: string;
  /** Heading level */
  level?: number; //1 | 2 | 3 | 4 | 5 | 6;
  /** Preformatted */
  pre?: boolean;
};

export type Options<AdditionalMetadata extends Metadata = QCMetadata> = {
  num?: QCConfigMetaSet<'number', false, AdditionalMetadata>;
  numList?: QCConfigMetaSet<'number', true, AdditionalMetadata>;
  opt?: QCConfigMetaSet<'string', false, AdditionalMetadata>;
  optList?: QCConfigMetaSet<'string', true, AdditionalMetadata>;
  flag?: QCConfigMetaSet<'boolean', false, AdditionalMetadata>;
  flagList?: QCConfigMetaSet<'boolean', true, AdditionalMetadata>;
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
