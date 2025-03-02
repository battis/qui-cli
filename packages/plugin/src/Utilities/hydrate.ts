export function hydrate(proposed: any, fallback: any) {
  if (proposed === undefined) {
    return fallback;
  }
  return proposed;
}
