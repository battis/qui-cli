import { Colors } from '@battis/qui-cli.Colors';
import * as Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import ora from 'ora';
import path from 'path';
import stripAnsi from 'strip-ansi';
import winston from 'winston';
import { CustomLevels, DefaultLevels } from './Levels.js';

export { CustomLevels, DefaultLevels };

export type Configuration = {
  logFilePath?: string;
  stdoutLevel?: string;
  fileLevel?: string;
  levels?: CustomLevels;
  root?: string;
};

export const name = 'log';
export const src = import.meta.dirname;

let logFilePath: string | undefined = undefined;
let stdoutLevel = 'info';
let fileLevel = 'all';
let levels: CustomLevels = DefaultLevels;
let root: string | undefined = undefined;

let transports: Record<string, winston.transport> = {
  console: new winston.transports.Console({
    format: winston.format.printf(({ message }) => message as string),
    level: 'info'
  })
};

let logger = winston.createLogger({
  transports: [transports.console] // TODO Is pre-loading console transport safe?
});

let format = {
  stripColors: winston.format((info) => {
    for (const prop in info) {
      if (typeof info[prop] === 'string') {
        info[prop] = stripAnsi(info![prop]);
      }
    }
    return info;
  })
};

export function configure(config: Configuration) {
  logFilePath = Plugin.hydrate(config.logFilePath, logFilePath);
  stdoutLevel = Plugin.hydrate(config.stdoutLevel, stdoutLevel);
  fileLevel = Plugin.hydrate(config.fileLevel, fileLevel);
  levels = Plugin.hydrate(config.levels, levels);
  root = Plugin.hydrate(config.root, root);
}

export function options() {
  return {
    opt: {
      logFilePath: {
        description: `Path to log file (optional)`
      },
      stdoutLevel: {
        description: `Log level to console stdout: ${Colors.quotedValue('"off"')}, ${Colors.quotedValue('"fatal"')}, ${Colors.quotedValue('"error"')}, ${Colors.quotedValue('"warning"')}, ${Colors.quotedValue('"info"')}, ${Colors.quotedValue('"debug"')}, ${Colors.quotedValue('"trace"')}, or ${Colors.quotedValue('"all"')} (default: ${Colors.quotedValue(`"${stdoutLevel}"`)})`,
        default: stdoutLevel
      },
      fileLevel: {
        description: `Log level to log file (if path proved): ${Colors.quotedValue('"off"')}, ${Colors.quotedValue('"fatal"')}, ${Colors.quotedValue('"error"')}, ${Colors.quotedValue('"warning"')}, ${Colors.quotedValue('"info"')}, ${Colors.quotedValue('"debug"')}, ${Colors.quotedValue('"trace"')}, or ${Colors.quotedValue('"all"')} (default: ${Colors.quotedValue(`"${fileLevel}"`)})`,
        default: fileLevel
      }
    }
  };
}

export function init({
  values = {}
}: Plugin.Arguments<ReturnType<typeof options>>) {
  transports.console.level = stdoutLevel;
  logger.configure({
    levels: levels.levels,
    transports: [transports.console]
  });
  if (logFilePath) {
    const filename = path.resolve(root || Root.path(), logFilePath);
    const spinner = ora(`Connecting to ${Colors.url(filename)}`).start();
    transports.file = new winston.transports.File({
      filename,
      level: fileLevel,
      format: winston.format.combine(
        format.stripColors(),
        winston.format.timestamp(),
        winston.format.json()
      )
    });
    logger.add(transports.file);
    winston.addColors(levels.colors);
    spinner.succeed(
      `Logging level ${Colors.value(fileLevel)} to ${Colors.url(filename)}`
    );
  }
}

export function get() {
  return logger;
}

function colorObject(obj: object) {
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
          message = colorObject(message);
        }
      }
    }
    return logger.log(level, message, ...meta);
  };
}

export const log = logger.log.bind(logger);
export const trace = namedLogMethod('trace');
export const debug = namedLogMethod('debug');
export const info = namedLogMethod('info');
export const warning = namedLogMethod('warning');
export const error = namedLogMethod('error');
export const fatal = namedLogMethod('fatal');
