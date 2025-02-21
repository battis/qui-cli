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
    configure();
  }
  if (!_jack) {
    throw new Error('Bad things!');
  }
  return _jack;
}

let requirePositionals: boolean | number | undefined = undefined;

export function configure(config: Configuration = {}) {
  requirePositionals = Plugin.hydrate(
    config.requirePositionals,
    requirePositionals
  );

  _jack = new Jack({
    ...config,
    allowPositionals:
      config.allowPositionals !== undefined
        ? config.allowPositionals
        : !!requirePositionals
  });
}

export function options(options: Plugin.Options = {}): Options {
  return Plugin.mergeOptions(
    Plugin.mergeOptions(
      {
        flag: {
          help: {
            description: 'Get usage information',
            short: 'h'
          }
        }
      },
      Plugin.Registrar.options()
    ),
    options
  );
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
  apply(options(externalOptions));

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
