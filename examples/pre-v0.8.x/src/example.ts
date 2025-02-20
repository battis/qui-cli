import cli from '@battis/qui-cli';

cli.configure({ allowPositionals: true });

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

cli.shell.exec('echo "hello world"');
