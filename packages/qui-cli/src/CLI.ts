import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import { Env } from '@battis/qui-cli.env';
import { Log } from '@battis/qui-cli.log';
import { Progress } from '@battis/qui-cli.progress';
import { Root } from '@battis/qui-cli.root';
import { Shell } from '@battis/qui-cli.shell';
import { Validators } from '@battis/qui-cli.validators';

export const colors = Colors;
export const env = Env;
export const log = Log;
export const progress = Progress;
export const root = Root;
export const shell = Shell;
export const validators = Validators;

export type Configuration = Core.Configuration;
export type Options = Core.Options;

export const configure = Core.configure;
export const options = Core.options;
export const init = Core.init;
