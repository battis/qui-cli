export type Base = Record<string, unknown>;
export type Hook<C extends Base = Base> = (config: C) => void | Promise<void>;
export type Validator<C extends Base = Base> = Record<
  keyof C,
  (proposal?: unknown) => boolean | Promise<boolean>
>;

export async function propose<C extends Base = Base>(
  config: C,
  proposal: C = {} as C,
  validator: Validator<C> = {} as Validator<C>
) {
  for (const key in proposal) {
    if (proposal[key] !== undefined) {
      if (!validator[key] || (await validator[key](proposal[key]))) {
        config[key] = proposal[key];
      }
    }
  }
}

export function defaultHook<C extends Base = Base>(
  config: C,
  validator?: Validator<C>
): Hook<C> {
  return async (proposal: C = {} as C) => propose(config, proposal, validator);
}
