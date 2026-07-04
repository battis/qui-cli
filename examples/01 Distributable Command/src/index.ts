import { Core } from '@qui-cli/core';

/* Initialize `positionals` and `values` with command line options */
const { values, positionals } =
  /* Configure Core to expect a specific set of command line options */
  await Core.init({
    opt: {
      stringValue: {
        description: 'A text option',
        short: 's',
        hint: 'A'
      }
    },
    num: {
      numberValue: {
        description: 'A number option (with a secret default value)',
        short: 'n',
        default: 42,
        secret: true
      }
    },
    flag: {
      booleanValue: {
        description: 'A boolean flag',
        short: 'b'
      }
    }
  });

/*
 * let Core process command line options (including --help which displays
 * command usage documentation)
 */
await Core.run();

/* body of my-command */
process.stdout.write(JSON.stringify({ values, positionals }));
