import { kebabCase, pascalCase, constantCase } from 'change-case';
import * as Plugin from '@qui-cli/plugin';
import { Colors } from '@qui-cli/colors';

export type Configuration = Plugin.Configuration & {
  delimiter?: string;
  placeholders?: Record<string, string[]>;
};

export const name = 'placeholders';
const config: Configuration = {
  delimiter: ','
};

export function configure(proposal: Configuration = {}) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      config[key] = proposal[key];
    }
  }
}

export function options() {
  return {
    man: [{ level: 1, text: 'Placeholders Options' }],
    optList: {
      placeholder: {
        description:
          `A placeholder name to search filenames and contents for and to ` +
          `replace with the matching ${Colors.optionArg('--replace')} value. ` +
          `A placeholder ${Colors.varName('$name')} that is matched in ` +
          `${Colors.keyword('kebab-case')} will be replaced with the first ` +
          `replacement in kebab-case, likewise the ${Colors.varName('$Name')} ` +
          `in ${Colors.keyword('PascalCase')} will be replaced with the first ` +
          `replacement in PascalCase. The ${Colors.varName('$NAME_1')} in ` +
          `${Colors.keyword('CONSTANT_CASE')} with a zero-based index will be ` +
          `replaced by that replacement value.`,
        short: 'p',
        default: Object.keys(config.placeholders || {})
      },
      replace: {
        description:
          `A set of replacement values, delimited by ` +
          `${Colors.optionArg('--delimiter')} for a ` +
          `${Colors.optionArg('--placeholder')}. Placeholders and replacements ` +
          `are paired based on their order of entry.`,
        short: 'r',
        default: Object.values(config.replacements || {}).map((r) =>
          typeof r === 'string' ? r : r.join(config.delimiter)
        )
      }
    },
    opt: {
      delimiter: {
        description: `The delimiter for lists of ${Colors.optionArg('--replacement')} values`,
        default: config.delimiter
      }
    }
  };
}

export function init({ values }: Plugin.ExpectedArguments<typeof options>) {
  const {
    placeholder = [],
    replace = [],
    delimiter = config.delimiter,
    ...rest
  } = values;
  if (delimiter) {
    configure({
      placeholders: Object.fromEntries(
        placeholder.map((placeholder, i) => [
          placeholder,
          replace[i].split(delimiter)
        ])
      ),
      ...rest
    });
  }
}

type Options = {
  placeholder: string;
  replace: string | string[];
  haystack: string;
};

export function replace({ placeholder, replace, haystack }: Options) {
  if (typeof replace === 'string') {
    replace = [replace];
  }
  let gold = haystack
    .replaceAll(`$${kebabCase(placeholder)}`, kebabCase(replace[0]))
    .replaceAll(`$${pascalCase(placeholder)}`, pascalCase(replace[0]));
  gold = replace.reduce(
    (g, r, i) =>
      g.replaceAll(
        new RegExp(`\\$${constantCase(placeholder)}_${i}(?!\\d)`, 'g'),
        r
      ),
    gold
  );
  return gold;
}

export function replaceAll(
  haystack: string,
  placeholders = config.placeholders
) {
  let gold = haystack;
  for (const placeholder in placeholders) {
    gold = replace({
      placeholder,
      replace: placeholders[placeholder],
      haystack: gold
    });
  }
  return gold;
}
