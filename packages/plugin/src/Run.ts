export type Result = any;

export type AccumulatedResults = Record<string, Result>;

export type Hook = (results?: AccumulatedResults) => Result | Promise<Result>;
