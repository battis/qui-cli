import Chalk from 'chalk';
import nodePath from 'node:path';

// console.log styles
/** Literal values that don't match other, more specific, categories */
export const value = Chalk.yellow;
/** Variable and constant names */
export const varName = value;
/**
 * A quoted value (e.g. `"hello world"`). Quotation marks should be included in
 * the `text` argument.
 */
export const quotedValue = Chalk.green;
/**
 * A regular expression value (e/g `/.+/`). Expression delimiters (`/`) should
 * be included in the `text` argument.
 */
export const regexpValue = Chalk.red;
/** A URL value (e.g. `https://example.com` or `./path/to/file`). */
export const url = Chalk.blue;

/**
 * A file or URL path (e.g. `../../path/to/file`).
 *
 * Highlight the filename by passing a second argument:
 *
 * ```ts
 * Colors.path('path/to/filename', Colors.value);
 * ```
 *
 * > <code style="color:skyblue">path/to/<span
 * > style="color:yellow">filename</span></code>
 */
export function path(value: string, highlight = (v: string) => v) {
  return url(
    `${value.indexOf('/') >= 0 ? `${nodePath.dirname(value)}/` : ''}${highlight(nodePath.basename(value))}`
  );
}

/** An error message (e.g. `Bad things happened!`). */
export const error = Chalk.red.bold;

// node-style
/**
 * A shell command (e.g. `echo "hello world"`).
 *
 * Highlight the command name by passing a second argument:
 *
 * ```ts
 * Colors.command('echo hello world', Colors.keyword);
 * ```
 *
 * > <code style="color:magenta"><b>echo</b> hello world</code>
 */
export function command(value: string, highlight = (v: string) => v) {
  const tokens = value.split(' ');
  return Chalk.magenta(
    `${highlight(tokens.shift() || '')} ${tokens.join(' ')}`
  );
}
/**
 * A keyword (e.g. a shell command), as in:
 *
 * ```ts
 * console.log(Colors.command(`${Colors.keyword('echo')} "hello world"`));
 * ```
 */
export const keyword = Chalk.bold;

// man page styles
/**
 * The name of an option argument (e.g. `--my-fancy-option`), as in:
 *
 * ```ts
 * console.log(
 *   `${Colors.optionArg('--my-fancy-option')} ${Colors.quotedValue('"pinkies out"')}`
 * );
 * ```
 */
export const optionArg = value;
/** The name of a flag argument (e.g. `--no-errors-please`). */
export const flagArg = value;
/** The name of a positional argument (e.g. `arg0`). */
export const positionalArg = Chalk.underline;
