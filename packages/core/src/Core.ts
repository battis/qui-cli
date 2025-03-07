import * as Plugin from '@battis/qui-cli.plugin';
import { Jack, JackOptions } from 'jackspeak';

export type Configuration = Record<string, Plugin.Configuration> & {
  core?: JackOptions & {
    requirePositionals?: boolean | number;
  };
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
let initialized = false;

export async function configure({ core, ...pluginConfig }: Configuration = {}) {
  requirePositionals = Plugin.hydrate(
    core?.requirePositionals,
    requirePositionals
  );

  _jack = new Jack({
    ...core,
    allowPositionals: !!requirePositionals
  });

  await Plugin.Registrar.configure(pluginConfig);
}

export async function options(
  externalOptions: Plugin.Options = {}
): Promise<Options> {
  /*
   * TODO automate default value documentation
     Issue URL: https://github.com/battis/qui-cli/issues/38
   *  Including parsing `env` (#34) and `secret` (#33) fields
   */
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
      await Plugin.Registrar.options()
    ),
    externalOptions
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

export async function init(
  externalOptions?: Plugin.Options | Options
): Promise<Plugin.Arguments<Options>> {
  if (initialized) {
    throw new Error(
      `Already initialized with user-provided command line arguments.`
    );
  }
  apply(await options(externalOptions));

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

  await Plugin.Registrar.init(args);
  initialized = true;
  return args;
}

export async function run(
  externalOptions?: Plugin.Options | Options
): Promise<Plugin.AccumulatedResults | undefined> {
  if (!initialized) {
    await init(externalOptions);
  }
  return await Plugin.Registrar.run();
}

export function usage() {
  let usage = jack().usage();
  if (requirePositionals) {
    if (typeof requirePositionals === 'number') {
      if (requirePositionals > 1) {
        usage = usage.replace(
          /\n\n/m, // FIXME hilariously unreliable regex!
          // Issue URL: https://github.com/battis/qui-cli/issues/25
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
  // Issue URL: https://github.com/battis/qui-cli/issues/24
}
