import ora from 'ora';
import * as JSON from '../JSON/index.js';
import confirm from '@inquirer/confirm';
import { Log } from '@qui-cli/log';
import { Colors } from '@qui-cli/colors';

type Options = {
  src: unknown;
  dest: unknown;
  identifier: string;
  action: () => void | Promise<void>;
  force?: boolean;
};

export async function withDiff({
  src,
  dest,
  identifier,
  action,
  force = false
}: Options) {
  const spinner = ora(identifier).start();
  if (src !== undefined) {
    if (dest !== undefined) {
      if (JSON.isEqual(src, dest)) {
        spinner.succeed(`${identifier} up-to-date`);
        return;
      }
      let update = force;
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
        if (force) {
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
    spinner.fail(Colors.error(`${identifier} source missing`));
    return;
  }
}
