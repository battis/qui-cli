import cli from '@battis/qui-cli';
import { input } from '@inquirer/prompts';
import path from 'node:path';

cli.env.configure({ path: path.resolve(import.meta.dirname, '../.env') });
cli.configure({
  allowPositionals: true
});

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

cli.env.set({
  key: 'RUNS',
  value: `${parseInt(cli.env.get({ key: 'RUNS' }) || '0') + 1}`
});
cli.log.info(`${process.env.RUNS} runs (.env updated)`);

cli.log.info({ args });

cli.log.error(
  cli.colors.error(
    `A fake error with ${cli.colors.value('a value')} and a ${cli.colors.quotedValue(`"quoted value"`)}`
  )
);

cli.log.info(cli.colors.url(cli.root.path()));

cli.shell.exec('echo "hello world"');

const text = await input({
  message: 'Enter a long-ish word',
  default: 'quetzlcoatl',
  validate: cli.validators.combine(
    cli.validators.minLength(10),
    cli.validators.maxLength(100)
  )
});
cli.progress.start({ value: 0, max: text.length });
for (let i = 0; i < text.length; i++) {
  setTimeout(() => {
    cli.progress.caption(text.substring(0, i + 1));
    cli.progress.increment();
  }, i * 100);
}
setTimeout(cli.progress.stop, 5000);
