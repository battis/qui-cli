export type Base = Record<string, any>;

export type Hook = (config: Base) => void | Promise<void>;
