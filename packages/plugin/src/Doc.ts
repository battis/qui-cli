import { ConfigType } from 'jackspeak';
import { Metadata, QCConfigOptionMeta, QCMetadata } from './Opt.js';

export type Hook = <
  Type extends ConfigType,
  Multiple extends boolean,
  AdditionalMetadata extends Metadata = QCMetadata,
  Config extends QCConfigOptionMeta<Type, Multiple, AdditionalMetadata> =
    QCConfigOptionMeta<Type, Multiple, AdditionalMetadata>
>(
  name: string,
  config: Config,
  configType: Type,
  multiple: Multiple
) => Config | Promise<Config>;
