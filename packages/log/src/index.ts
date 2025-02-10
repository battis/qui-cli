import { Colors } from '@battis/qui-cli.colors';
import Plugin from '@battis/qui-cli.plugin';
import { Root } from '@battis/qui-cli.root';
import fs from 'node:fs';
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

let logFilePath: string | undefined = undefined;
let stdoutLevel = 'info';
let fileLevel = 'all';
let levels: CustomLevels = DefaultLevels;
let root: string | undefined = undefined;

let logger = winston.createLogger({
  transports: []
});
const transports: Record<string, winston.transport> = {
  console: new winston.transports.Console({
    format: winston.format.printf(({ message }) => message as string),
    level: 'info'
  })
};

const format = {
  stripColors: winston.format((info) => {
    for (const prop in info) {
      if (typeof info[prop] === 'string') {
        info[prop] = stripAnsi(info[prop] as string);
      }
    }
    return info;
  })
};

const { name, dependencies } = await Plugin.define({
  pathToPluginSourceDirectory: import.meta.dirname
});

async function configure(config?: Configuration) {
  logFilePath = config?.logFilePath;
  stdoutLevel =
    config?.stdoutLevel !== undefined ? config.stdoutLevel : stdoutLevel;
  fileLevel = config?.fileLevel !== undefined ? config.fileLevel : fileLevel;
  levels = config?.levels !== undefined ? config.levels : levels;
  root = config?.root;
}

function options() {
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

function init({
  values: {
    logFilePath: filePath = logFilePath,
    stdoutLevel: stdout = stdoutLevel,
    fileLevel: file = fileLevel
  } = {}
}: Plugin.Arguments<ReturnType<typeof options>>) {
  transports.console.level = stdout;
  logger.configure({
    levels: levels.levels,
    transports: [transports.console]
  });
  if (filePath) {
    const filename = path.resolve(root || Root.path(), filePath);
    const spinner = ora(`Connecting to ${Colors.url(filename)}`).start();
    transports.file = new winston.transports.File({
      filename,
      level: file,
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

function get() {
  return logger || init({ positionals: [], values: {} }); // FIXME janky literal
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
    return logger.log(level, message as string, ...meta);
  };
}

export const Log: Plugin.Container = {
  name,
  dependencies,
  configure,
  options,
  init,
  get,
  log: logger.log.bind(logger),
  trace: namedLogMethod('trace'),
  debug: namedLogMethod('debug'),
  info: namedLogMethod('info'),
  warning: namedLogMethod('warning'),
  error: namedLogMethod('error'),
  fatal: namedLogMethod('fatal')
};

export { Log as default };
