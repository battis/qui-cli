import * as Opt from './Opt.js';

export type Arguments<O extends Opt.Options> = {
  values: Exclude<
    | { [K in keyof O['num']]?: number }
    | { [K in keyof O['numList']]?: number[] }
    | { [K in keyof O['opt']]?: string }
    | { [K in keyof O['optList']]?: string[] }
    | { [K in keyof O['flag']]: boolean | undefined }
    | { [K in keyof O['flagList']]?: boolean[] },
    Record<string, never>
  >;
  positionals: string[];
};

export type ExpectedArguments<H extends Opt.Hook> = Arguments<
  Awaited<ReturnType<H> extends never ? ReturnType<H> : Awaited<ReturnType<H>>>
>;

export type Hook<O extends Opt.Options = Opt.Options> = (
  args: Arguments<O>
) => void | Promise<void>;
