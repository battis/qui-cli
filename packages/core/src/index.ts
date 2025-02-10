import Plugin from '@battis/qui-cli.plugin';
import { ArrayElement } from '@battis/typescript-tricks';
import { Jack, JackOptions } from 'jackspeak';
import shelljs from 'shelljs';

export type Options = JackOptions & {
  requirePositionals?: boolean | number;
} & Plugin.Options;

export class Core implements Plugin.Registrar {
  public static readonly defaults = {
    requirePositionals: undefined,
    allowPositionals: true,
    envPrefix: 'ARG',
    env: process.env,
    usage: undefined,
    stopAtPositional: false
  };

  public plugins: Plugin.Container[] = [];

  private _jack: Jack | undefined = undefined;
  private get jack() {
    if (!this._jack) {
      throw new Error('jackspeak has not been instantiated');
    }
    return this._jack;
  }

  private requirePositionals: boolean | number | undefined = undefined;

  /*
   * TODO Plugin redesign
   *   It would be an improvement if a registered plugin showed as a property
   *   of cli, but was undefined if not attached -- without requiring a lot of
   *   property interpolations.
   */
  public async register(plugin: Plugin.Container) {
    if (!this.plugins.includes(plugin)) {
      for (const dependency of plugin.dependencies) {
        let found = false;
        for (const installed of this.plugins) {
          if (installed.name === dependency) {
            found = true;
          }
        }
        if (!found) {
          throw new Error(
            `Dependency ${dependency} must be installed before ${plugin.name}`
          );
        }
      }
      this.plugins.push(plugin);
    }
  }

  private apply({
    num,
    numList,
    opt,
    options,
    optList,
    optionLists,
    flag,
    flags,
    flagList,
    fields,
    man = []
  }: Plugin.Options) {
    this.jack
      .num({ ...num })
      .numList({ ...numList })
      .opt({ ...options, ...opt })
      .optList({ ...optionLists, ...optList })
      .flag({ ...flags, ...flag })
      .flagList({ ...flagList })
      .addFields({ ...fields });
    for (const paragraph of man) {
      if (paragraph.level) {
        this.jack.heading(paragraph.text, paragraph.level, {
          pre: paragraph.pre
        });
      } else {
        this.jack.description(paragraph.text, { pre: paragraph.pre });
      }
    }
  }

  private merge(opt: Plugin.Options, pluginOptions: Plugin.Options) {
    return {
      num: { ...opt.num, ...pluginOptions.num },
      numList: { ...opt.numList, ...pluginOptions.numList },
      opt: {
        ...opt.options,
        ...opt.opt,
        ...pluginOptions.options,
        ...pluginOptions.opt
      },
      optList: {
        ...opt.optionLists,
        ...opt.optList,
        ...pluginOptions.optionLists,
        ...pluginOptions.optList
      },
      flag: {
        ...opt.flags,
        ...opt.flag,
        ...pluginOptions.flags,
        ...pluginOptions.flag
      },
      flagList: { ...opt.flagList, ...pluginOptions.flagList },
      fields: { ...opt.fields, ...pluginOptions.fields },
      man: [...(opt.man || []), ...(pluginOptions.man || [])]
    };
  }

  public init(
    options: Options = {}
  ): Plugin.Arguments<
    typeof options &
      ReturnType<ArrayElement<(typeof this)['plugins']>['options']>
  > {
    const {
      requirePositionals: _reqPos = Core.defaults.requirePositionals,
      allowPositionals = Core.defaults.allowPositionals,
      env = Core.defaults.env,
      envPrefix = Core.defaults.envPrefix,
      usage = Core.defaults.usage,
      stopAtPositional = Core.defaults.stopAtPositional
    } = options;
    this.requirePositionals = _reqPos;
    this._jack = new Jack({
      allowPositionals:
        allowPositionals !== undefined
          ? allowPositionals
          : !!this.requirePositionals,
      envPrefix,
      usage,
      env,
      stopAtPositional
    }).flag({
      help: {
        short: 'h',
        description: 'Get usage information'
      }
    });
    let opt: Plugin.Options = options;

    for (const plugin of this.plugins) {
      opt = this.merge(opt, plugin.options());
    }
    this.apply(opt);

    const { positionals = [], values = {} } = this.jack.parse();

    if ('help' in values && values.help) {
      shelljs.echo(this.usage());
      process.exit(0);
    }

    if (
      this.requirePositionals &&
      (!positionals.length ||
        (typeof this.requirePositionals == 'number' &&
          positionals.length < this.requirePositionals))
    ) {
      throw new Error(
        `Incorrect positional arguments (${this.requirePositionals} expected, ${positionals.length} provided)`
      );
    }

    const uninitialized = [...this.plugins];
    while (uninitialized.length) {
      const plugin = uninitialized.pop();
      if (plugin) {
        let ready = true;
        for (const dependency of plugin?.dependencies || []) {
          for (const waiting of uninitialized) {
            if (ready && dependency === waiting.name) {
              uninitialized.unshift(plugin);
              ready = false;
            }
          }
        }
        if (ready) {
          plugin.init({ positionals, values });
        }
      }
    }

    return { positionals, values };
  }

  public usage() {
    let usage = this.jack.usage();
    if (this.requirePositionals) {
      if (typeof this.requirePositionals === 'number') {
        if (this.requirePositionals > 1) {
          usage = usage.replace(
            /\n\n/m, // FIXME hilariously unreliable regex!
            ` arg0..arg${this.requirePositionals - 1}\n\n`
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

  public usageMarkdown() {
    return this.jack.usageMarkdown(); // FIXME format arguments
  }
}
