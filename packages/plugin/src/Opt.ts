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

export type Hook = () => Options | Promise<Options>;
