import { CustomLevels, DefaultLevels } from './log/options.js';
import {
  FlagsConfig,
  OptionListsConfig,
  Options,
  OptionsConfig
} from './options/types.js';
import { RecursivePartial } from '@battis/typescript-tricks';
import appRootPath from 'app-root-path';

const defaults: Options = {
  env: {
    root: appRootPath.toString(),
    loadDotEnv: true,
    setRootAsCurrentWorkingDirectory: true
  },
  args: {
    envPrefix: 'ARG',
    requirePositionals: false,
    options: {
      logFilePath: {
        description: 'Path to log file'
      },
      stdoutLevel: {
        description:
          'Log level to console stdout: off, fatal, error, warning, info, debug, trace, or all (default: info)'
      },
      fileLevel: {
        description:
          'Log level to log file (if path proved): off, fatal, error, warning, info, debug, trace, or all (default: all)'
      }
    },
    optionLists: {},
    flags: {
      help: {
        short: 'h',
        description: 'Usage'
      },
      commands: {
        description: 'Include shell commands in log'
      },
      silent: {
        description:
          'Hide command output (on by default, use --no-silent to disable)'
      }
    }
  },
  shell: {
    showCommands: true,
    silent: false
  },
  log: {
    logFilePath: undefined,
    stdoutLevel: 'info',
    fileLevel: 'all',
    levels: DefaultLevels,
    root: process.cwd()
  }
};

function hydrate(options: RecursivePartial<Options>): Options {
  const combine = <T>(fallback: T | undefined, arg?: T) =>
    (arg !== undefined ? arg : fallback) as T;

  const merge = <T>(fallback: T, arg?: T) =>
    ({
      ...fallback,
      ...(arg || {})
    } as T);

  return {
    env: {
      root: combine<string>(defaults.env.root, options?.env?.root),
      setRootAsCurrentWorkingDirectory: combine<boolean>(
        defaults.env.setRootAsCurrentWorkingDirectory,
        options?.env?.setRootAsCurrentWorkingDirectory
      ),
      loadDotEnv: combine<string | boolean>(
        defaults.env.loadDotEnv,
        options?.env?.loadDotEnv
      )
    },
    args: {
      envPrefix: combine<string>(
        defaults.args.envPrefix,
        options?.args?.envPrefix
      ),
      requirePositionals: combine<boolean | number>(
        defaults.args.requirePositionals,
        options?.args?.requirePositionals
      ),
      options: merge<OptionsConfig>(
        defaults.args.options,
        options?.args?.options as OptionsConfig
      ),
      optionLists: merge<OptionListsConfig>(
        defaults.args.optionLists,
        options?.args?.optionLists as OptionListsConfig
      ),
      flags: merge<FlagsConfig>(
        defaults.args.flags,
        options?.args?.flags as FlagsConfig
      )
    },
    shell: {
      showCommands: combine<boolean>(
        defaults.shell.showCommands,
        options?.shell?.showCommands
      ),
      silent: combine<boolean>(defaults.shell.silent, options?.shell?.silent)
    },
    log: {
      logFilePath: combine<string>(
        defaults.log.logFilePath,
        options?.log?.logFilePath
      ),
      stdoutLevel: combine<string>(
        defaults.log.stdoutLevel,
        options?.log?.stdoutLevel
      ),
      fileLevel: combine<string>(
        defaults.log.fileLevel,
        options?.log?.fileLevel
      ),
      levels: combine<CustomLevels>(
        defaults.log.levels,
        options?.log?.levels as CustomLevels
      ),
      root: combine<string>(defaults.log.root, options?.log?.root)
    }
  };
}

export default { defaults, hydrate };
