import chalk from 'chalk';

// console.log styles
/** Literal values that don't match other, more specific, categories */
export const value = chalk.yellow;
/** Variable and constant names */
export const varName = value;
/**
 * A quoted value (e.g. `"hello world"`). Quotation marks should be included in
 * the `text` argument.
 */
export const quotedValue = chalk.green;
/**
 * A regular expression value (e/g `/.+/`). Expression delimiters (`/`) should
 * be included in the `text` argument.
 */
export const regexpValue = chalk.red;
/** A URL value (e.g. `https://example.com` or `./path/to/file`). */
export const url = chalk.blue;
/** A file or URL path (e.g. `../../path/to/file`). */
export const path = url;
/** An error message (e.g. `Bad things happened!`). */
export const error = chalk.red.bold;

// node-style
/** A shell command (e.g. `echo "hello world"`). */
export const command = chalk.magenta;
/**
 * A keyword (e.g. a shell command), as in:
 *
 * ```ts
 * console.log(Colors.command(`${Colors.keyword('echo')} "hello world"`));
 * ```
 */
export const keyword = chalk.bold;

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
export const positionalArg = chalk.underline;
