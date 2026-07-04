import ora from 'ora';
import { isEqual } from '../isEqual.js';
import confirm from '@inquirer/confirm';
import { Log } from '@qui-cli/log';
import { Configuration } from '../Configuration.js';
import { Colors } from '@qui-cli/colors';

export async function withDiff(
  src: unknown,
  dest: unknown,
  identifier: string,
  action: () => void | Promise<void>,
  config: Configuration
) {
  const spinner = ora(identifier).start();
  if (src !== undefined) {
    if (dest !== undefined) {
      if (isEqual(src, dest)) {
        spinner.succeed(`${identifier} up-to-date`);
        return;
      }
      let update = config.force;
      if (!update) {
        spinner.stop();
        update = await confirm({
          message: `In ${identifier}, replace:\n\n${
            typeof dest === 'string'
              ? dest
                  .split('\n')
                  .map((line) => `  ${line}`)
                  .join('\n')
              : Log.syntaxColor(dest || 'null')
          }\n\nwith:\n\n${
            typeof src === 'string'
              ? src
                  .split('\n')
                  .map((line) => `  ${line}`)
                  .join('\n')
              : Log.syntaxColor(src || 'null')
          }\n\nConfirm?`
        });
      }
      if (update) {
        await action();
        if (config.force) {
          spinner.succeed(`${identifier} updated`);
        }
        return;
      }
    } else {
      await action();
      spinner.succeed(`${identifier} created`);
      return;
    }
  } else {
    spinner.fail(
      Colors.error(`${identifier} source missing in ${config.packageName}`)
    );
    return;
  }
}
