/** @deprecated use default  */
export function hydrate<Fallback, Proposed extends Fallback | undefined>(
  proposed: Proposed,
  fallback: Fallback
) {
  if (proposed === undefined) {
    return fallback;
  }
  return proposed;
}
