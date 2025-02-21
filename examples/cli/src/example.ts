import cli from '@battis/qui-cli';
import { input } from '@inquirer/prompts';
import path from 'node:path';

// configuration before command-line user options are processed
cli.env.configure({ path: path.resolve(import.meta.dirname, '../.env') });
cli.configure({
  allowPositionals: true
});

// process command-line user options
const args = cli.init({
  opt: {
    opt0: {},
    opt1: {}
  },
  flag: {
    flag0: { default: false },
    flag1: { default: false }
  }
});
cli.log.info({ args });

// @battis/qui-cli.env example
cli.env.set({
  key: 'RUNS',
  value: `${parseInt(cli.env.get({ key: 'RUNS' }) || '0') + 1}`
});
cli.log.info(`${process.env.RUNS} runs (.env updated)`);

// @battis/qui-cli.log and @battis/qui-cli.colors examples
cli.log.error(
  cli.colors.error(
    `A fake error with ${cli.colors.value('a value')} and a ${cli.colors.quotedValue(`"quoted value"`)}`
  )
);

// @battis/qui-cli.root example
cli.log.info(cli.colors.url(cli.root.path()));

// @battis/qui-cli.shell example
cli.shell.exec('echo "hello world"');

// @battis/qui-cli.validators example
const text = await input({
  message: 'Enter a long-ish word',
  default: 'quetzlcoatl',
  validate: cli.validators.combine(
    cli.validators.minLength(10),
    cli.validators.maxLength(100)
  )
});

// @battis/qui-cli.progress example
cli.progress.start({ value: 0, max: text.length });
for (let i = 0; i < text.length; i++) {
  setTimeout(() => {
    cli.progress.caption(text.substring(0, i + 1));
    cli.progress.increment();
  }, i * 100);
}
setTimeout(cli.progress.stop, (text.length + 1) * 100);
