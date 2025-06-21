import { Colors } from '@battis/qui-cli.colors';
import { Core } from '@battis/qui-cli.core';
import * as Plugin from '@battis/qui-cli.plugin';
import { camelCase } from 'change-case';
import { Jack } from 'jackspeak';
import fs from 'node:fs';
import path from 'node:path';

type Command = {
  name: string;
  fileName: string;
  man?: NonNullable<Plugin.Options['man']>;
};

type Options = {
  fileName: string;
  commandName?: string;
  commandDirPath?: string;
  commandCase?: (token: string) => string;
};

export async function build({
  fileName,
  commandName,
  commandDirPath,
  commandCase = camelCase
}: Options) {
  commandDirPath = commandDirPath || path.dirname(fileName);
  const [token] = process.argv.splice(2, 1);
  if (commandName) {
    process.argv[1] = Colors.keyword(commandName);
  }
  const availableCommands: Command[] = fs
    .readdirSync(commandDirPath)
    // no invisible commands
    .filter((f) => !/^\./.test(f))
    // this file isn't a command
    .filter((f) => f !== path.basename(fileName))
    // source maps are not commands
    .filter((f) => !/\.map$/.test(f))
    // normalize to commandCase
    .map((fileName) => {
      const command = {
        name: commandCase(
          fileName.replace(/\.[jt]s$/, '').replace(/[^a-z0-9]+/gi, '_')
        ),
        fileName
      };
      return command;
    });

  const command = availableCommands.find((command) => command.name === token);

  if (command) {
    let filePath = path.join(commandDirPath, command.fileName);
    if (fs.lstatSync(filePath).isDirectory()) {
      filePath = path.join(filePath, `index${path.extname(fileName)}`);
    }
    process.argv[1] = Colors.command(`${process.argv[1]} ${command.name}`);
    const module = await import(filePath);
    if (!/^index.[jt]s$/.test(path.basename(filePath))) {
      await Plugin.register(module);
      await Core.run();
    }
  } else {
    process.argv[1] = `${process.argv[1]} <command>`;
    const jack = new Jack();
    const manPath = path.join(commandDirPath, '.man.json');
    let man: Record<string, NonNullable<Plugin.Options['man']>> = {};
    if (fs.existsSync(manPath)) {
      man = JSON.parse(fs.readFileSync(manPath).toString());
      jack.description('Commands may be:');
      for (const module in man) {
        jack.heading(Colors.command(module), 2);
        for (const paragraph of man[module]) {
          jack.description(paragraph.text);
        }
      }
    } else {
      jack.description(
        `Commands may be: ${availableCommands
          .map((command) => Colors.command(command.name))
          .join(', ')}`
      );
    }
    console.log(jack.usage());
  }
}
