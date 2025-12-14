export type Result = unknown;

export type AccumulatedResults = Record<string, Result>;

export type Hook = (results?: AccumulatedResults) => Result | Promise<Result>;
