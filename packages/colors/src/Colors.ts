import chalk from 'chalk';

export const name = 'colors';

// console.log styles
export const value = chalk.yellow;
export const quotedValue = chalk.green;
export const regexpValue = chalk.red;
export const url = chalk.blue;
export const error = chalk.red.bold;

// node-stule
export const command = chalk.magenta;
export const keyword = chalk.bold;

// man page styles
export const optionArg = value;
export const flagArg = value;
export const positionalArg = chalk.underline;
