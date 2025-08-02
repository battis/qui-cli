import CLI from '@battis/qui-cli';
import { input } from '@inquirer/prompts';
import path from 'node:path';

// configuration before command-line user options are processed
await CLI.configure({
  core: {
    allowPositionals: true
  },
  env: {
    path: path.resolve(import.meta.dirname, '../.env')
  }
});

// process command-line user options
const args = await CLI.init({
  opt: {
    opt0: {},
    opt1: {}
  },
  flag: {
    flag0: { default: false },
    flag1: { default: false }
  }
});
CLI.log.info({ args });

// optionally run all loaded plugins (may not all have runnable methods)
await CLI.run();

// @qui-cli/env example
CLI.env.set({
  key: 'RUNS',
  value: `${parseInt((await CLI.env.get({ key: 'RUNS' })) || '0') + 1}`
});
CLI.log.info(`${process.env.RUNS} runs (.env updated)`);

// @qui-cli/log and @qui-cli/colors examples
CLI.log.error(
  CLI.colors.error(
    `A fake error with ${CLI.colors.value('a value')} and a ${CLI.colors.quotedValue(`"quoted value"`)}`
  )
);

// @qui-cli/root example
CLI.log.info(CLI.colors.url(CLI.root.path()));

// @battis/qui-cli.shell example
CLI.shell.exec('echo "hello world"');

// @battis/qui-cli.validators example
const text = await input({
  message: 'Enter a long-ish word',
  default: 'quetzlcoatl',
  validate: CLI.validators.combine(
    CLI.validators.minLength(10),
    CLI.validators.maxLength(100)
  )
});

// @battis/qui-cli.progress example
CLI.progress.start({ value: 0, max: text.length });
for (let i = 0; i < text.length; i++) {
  setTimeout(() => {
    CLI.progress.caption(text.substring(0, i + 1));
    CLI.progress.increment();
  }, i * 100);
}
setTimeout(CLI.progress.stop, (text.length + 1) * 100);
