export type Base = Record<string, unknown>;

export type Hook = (config: Base) => void | Promise<void>;
