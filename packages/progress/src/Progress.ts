import { Colors } from '@qui-cli/colors';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

// TODO convert progress to a full-fledged plugin
// Issue URL: https://github.com/battis/qui-cli/issues/26

type Options = {
  value?: number;
  max: number;
};

export const name = 'progress';

let _multibar: cliProgress.MultiBar | undefined = undefined;
function multibar() {
  if (!_multibar) {
    throw new Error(`Not yet initialized. Call configure() first.`);
  }
  return _multibar;
}

let _bar: cliProgress.SingleBar | undefined = undefined;
function bar() {
  if (!_bar) {
    throw new Error(`Not yet initialized. Call configure() first.`);
  }
  return _bar;
}

export function start({ value = 0, max }: Options) {
  _multibar = new cliProgress.MultiBar({
    format: `{bar} {percentage}% {eta_formatted} ${Colors.value('{caption}')}`,
    barCompleteChar: '█',
    barIncompleteChar: '█',
    autopadding: true,
    autopaddingChar: '   ',
    formatBar: (progress, options: cliProgress.Options) => {
      const completeSize = Math.round(progress * options.barsize!);
      const incompleteSize = options.barsize! - completeSize;
      return (
        chalk.green(options.barCompleteString!.substring(0, completeSize)) +
        options.barGlue +
        chalk.gray.dim(
          options.barIncompleteString!.substring(0, incompleteSize)
        )
      );
    }
  });
  _bar = multibar().create(max, value);
  bar().update({ caption: '' });
}

export function increment() {
  bar().increment();
}

export function caption(caption: string) {
  bar().update({
    caption: caption.substring(0, 24) + (caption.length > 24 ? '…' : '')
  });
}

export function stop() {
  multibar().stop();
}
