import { Root } from '@battis/qui-cli.root';
import { Colors } from '@qui-cli/colors';
import * as Plugin from '@qui-cli/plugin';
import ora from 'ora';
import path from 'path';
import stripAnsi from 'strip-ansi';
import winston from 'winston';
import { CustomLevels, DefaultLevels } from './Levels.js';

export { CustomLevels, DefaultLevels };

export type Configuration = Plugin.Configuration & {
  logFilePath?: string;
  stdoutLevel?: string;
  fileLevel?: string;
  levels?: CustomLevels;
  root?: string;
};

const OFF = 'off';
export const name = 'log';

let logFilePath: string | undefined = undefined;
let stdoutLevel = 'info';
let fileLevel = 'all';
let levels: CustomLevels = DefaultLevels;
let root: string | undefined = undefined;

let transports: Record<string, winston.transport> = {
  console: new winston.transports.Console({
    format: winston.format.printf(({ message }) => message as string),
    level: stdoutLevel
  })
};

let _logger: winston.Logger | undefined = undefined;
function logger() {
  if (!_logger) {
    _logger = winston.createLogger({
      levels: levels.levels,
      transports: Object.values(transports)
    });
  }
  return _logger;
}

function stripColors(info: winston.Logform.TransformableInfo) {
  for (const prop in info) {
    const value = info[prop];
    if (typeof value === 'string') {
      info[prop] = stripAnsi(value);
    }
  }
  return info;
}

export function configure(config: Configuration = {}) {
  root = Plugin.hydrate(config.root, root);

  if (config.levels) {
    levels = Plugin.hydrate(config.levels, levels);
    logger().configure({ levels: levels.levels });
    winston.addColors(levels.colors);
  }

  if (config.stdoutLevel) {
    if (transports.console) {
      logger().remove(transports.console);
    }
    stdoutLevel = Plugin.hydrate(config.stdoutLevel, stdoutLevel);
    if (stdoutLevel !== OFF) {
      transports.console = new winston.transports.Console({
        format: winston.format.printf(({ message }) => message as string),
        level: stdoutLevel
      });
      logger().add(transports.console);
    }
  }

  if (config.logFilePath) {
    logFilePath = Plugin.hydrate(config.logFilePath, logFilePath);
    if (logFilePath) {
      if (transports[logFilePath]) {
        logger().remove(transports[logFilePath]);
      }
      fileLevel = Plugin.hydrate(config.fileLevel, fileLevel);
      if (fileLevel !== OFF) {
        const filename = path.resolve(root || Root.path(), logFilePath);
        const spinner = ora(`Connecting to ${Colors.url(filename)}`).start();
        transports[logFilePath] = new winston.transports.File({
          filename,
          level: fileLevel,
          format: winston.format.combine(
            winston.format(stripColors)(),
            winston.format.timestamp(),
            winston.format.json()
          )
        });
        logger().add(transports[logFilePath]);
        spinner.succeed(
          `Logging level ${Colors.value(fileLevel)} to ${Colors.url(filename)}`
        );
      }
    }
  }
}

export function options(): Plugin.Options {
  const levelsList = [...Object.keys(levels.levels), OFF]
    .map((level) => Colors.quotedValue(`"${level}"`))
    .join(', ')
    .replace(/, ([^,]+)$/, ', or $1');
  return {
    opt: {
      logFilePath: {
        description: `Path to log file (optional)`
      },
      stdoutLevel: {
        description: `Log level to console stdout: ${levelsList} (default: ${Colors.quotedValue(`"${stdoutLevel}"`)})`,
        default: stdoutLevel
      },
      fileLevel: {
        description: `Log level to log file (if ${Colors.value('--logFilePath')} provided): ${levelsList} (default: ${Colors.quotedValue(`"${fileLevel}"`)})`,
        default: fileLevel
      }
    }
  };
}

export function init({ values }: Plugin.Arguments<ReturnType<typeof options>>) {
  configure(values);
}

export function get() {
  return logger();
}

export function syntaxColor(obj: object) {
  return JSON.stringify(obj, null, 2)
    .replace(/: ([^"{[][^,\n]*)/g, `: ${Colors.value('$1')}`)
    .replace(/: ("([^"]|\\")*")/g, `: ${Colors.quotedValue('$1')}`);
}

function namedLogMethod(level: string) {
  return (message: string | object, ...meta: any[]) => {
    if (typeof message != 'string') {
      if (meta.some((elt: any) => elt.color === false)) {
        if (message === undefined) {
          message = 'undefined';
        } else {
          message = JSON.stringify(message, null, 2);
        }
      } else {
        if (message === undefined) {
          message = Colors.value('undefined');
        } else {
          message = syntaxColor(message);
        }
      }
    }
    return logger().log(level, message, ...meta);
  };
}

export const log = logger().log.bind(logger);
export const trace = namedLogMethod('trace');
export const debug = namedLogMethod('debug');
export const info = namedLogMethod('info');
export const warning = namedLogMethod('warning');
export const error = namedLogMethod('error');
export const fatal = namedLogMethod('fatal');
