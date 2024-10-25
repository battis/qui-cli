import colors from './colors.js';
import { DefaultLevels, LogOptions } from './log/options.js';
import options from './options.js';
import ora from 'ora';
import path from 'path';
import stripAnsi from 'strip-ansi';
import winston from 'winston';

const logger = winston.createLogger({
  transports: []
});
const transports: Record<string, winston.transport> = {
  console: new winston.transports.Console({
    format: winston.format.printf(({ message }) => message),
    level: 'info'
  })
};

const format = {
  stripColors: winston.format((info) => {
    for (const prop in info) {
      if (typeof info[prop] === 'string') {
        info[prop] = stripAnsi(info[prop]);
      }
    }
    return info;
  })
};

export function init({
  logFilePath = options.defaults.log.logFilePath,
  stdoutLevel = options.defaults.log.stdoutLevel,
  fileLevel = options.defaults.log.fileLevel,
  levels = options.defaults.log.levels,
  root = options.defaults.log.root
}: Partial<LogOptions>) {
  transports.console.level = stdoutLevel;
  logger.configure({
    levels: levels.levels,
    transports: [transports.console]
  });
  if (logFilePath) {
    const filename = path.resolve(root, logFilePath);
    const spinner = ora(`Connecting to ${colors.url(filename)}`).start();
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
    spinner.succeed(
      `Logging level ${colors.value(fileLevel)} to ${colors.url(filename)}`
    );
  }
  winston.addColors(levels.colors);
  return logger;
}

export function get() {
  return logger || init({});
}

function namedLogMethod(level: string) {
  return (message: string, ...meta: any[]) =>
    logger.log(level, message, ...meta);
}

export const log = logger.log.bind(logger);
export const trace = namedLogMethod('trace');
export const debug = logger.debug.bind(logger);
export const info = logger.info.bind(logger);
export const warning = namedLogMethod('warning');
export const error = logger.error.bind(logger);
export const fatal = namedLogMethod('fatal');

export { DefaultLevels };
