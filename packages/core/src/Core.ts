import * as Plugin from '@battis/qui-cli.plugin';
import { Jack, JackOptions } from 'jackspeak';

export type Configuration = JackOptions & {
  requirePositionals?: boolean | number;
};

export type Options = Plugin.Options & {
  flag: {
    help: {
      description?: string;
    };
  };
};

let _jack: Jack | undefined = undefined;
function jack() {
  if (!_jack) {
    throw new Error(
      `Jackspeak is not yet initialized (make sure that configure() is called first).`
    );
  }
  return _jack;
}

let _options: Options | undefined = undefined;

let requirePositionals: boolean | number | undefined = undefined;
let allowPositionals = true;
let envPrefix = 'ARG';
let env = process.env;
let _usage: string | undefined = undefined;
let stopAtPositional = false;

export function configure(config: Configuration = {}) {
  requirePositionals = Plugin.hydrate(
    config.requirePositionals,
    requirePositionals
  );
  allowPositionals = Plugin.hydrate(config.allowPositionals, allowPositionals);
  envPrefix = Plugin.hydrate(config.envPrefix, envPrefix);
  env = Plugin.hydrate(config.env, env);
  _usage = Plugin.hydrate(config.usage, _usage);
  stopAtPositional = Plugin.hydrate(config.stopAtPositional, stopAtPositional);

  _jack = new Jack({
    allowPositionals:
      allowPositionals !== undefined ? allowPositionals : !!requirePositionals,
    envPrefix,
    usage: _usage,
    env,
    stopAtPositional
  });
}

export function options(options: Plugin.Options = {}): Options {
  _options = Plugin.mergeOptions(
    Plugin.mergeOptions(
      { flag: { help: { short: 'h', description: 'Get usage information' } } },
      Plugin.Registrar.options()
    ),
    options
  );

  return _options;
}

function apply({
  num,
  numList,
  opt,
  optList,
  flag,
  flagList,
  fields,
  man = []
}: Plugin.Options) {
  jack()
    .num({ ...num })
    .numList({ ...numList })
    .opt({ ...opt })
    .optList({ ...optList })
    .flag({ ...flag })
    .flagList({ ...flagList })
    .addFields({ ...fields });
  for (const paragraph of man) {
    if (paragraph.level) {
      jack().heading(paragraph.text, paragraph.level, {
        pre: paragraph.pre
      });
    } else {
      jack().description(paragraph.text, { pre: paragraph.pre });
    }
  }
}

export function init(
  externalOptions?: Plugin.Options | Options
): Plugin.Arguments<Options> {
  if (externalOptions || !_options) {
    options(externalOptions);
  }
  if (!_options) {
    throw new Error('Options have not been initialied. Call options() first.');
  }
  apply(_options);

  const args: Plugin.Arguments<Options> = jack().parse();
  const {
    positionals,
    values: { help }
  } = args;

  if (help) {
    console.log(usage());
    process.exit(0);
  }

  if (
    requirePositionals &&
    (!positionals.length ||
      (typeof requirePositionals == 'number' &&
        positionals.length < requirePositionals))
  ) {
    throw new Error(
      `Incorrect positional arguments (${requirePositionals} expected, ${positionals.length} provided)`
    );
  }

  Plugin.Registrar.init(args);
  return args;
}

export function usage() {
  let usage = jack().usage();
  if (requirePositionals) {
    if (typeof requirePositionals === 'number') {
      if (requirePositionals > 1) {
        usage = usage.replace(
          /\n\n/m, // FIXME hilariously unreliable regex!
          ` arg0..arg${requirePositionals - 1}\n\n`
        );
      } else {
        usage = usage.replace(/\n\n/m, ' argument\n\n');
      }
    } else {
      usage = usage.replace(/\n\n/m, ' argument0...\n\n');
    }
  }
  return usage;
}

export function usageMarkdown() {
  return jack().usageMarkdown(); // FIXME format arguments
}
