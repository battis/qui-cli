export function isEqual(a: unknown, b: unknown) {
  if (a && b) {
    if (typeof a === 'object' && typeof b === 'object') {
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === b.length) {
          for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) {
              return false;
            }
          }
          return true;
        }
      } else {
        const keys = Object.keys(a) as (keyof typeof a)[];
        if (keys.length === Object.keys(b).length) {
          for (const key of keys) {
            if (!isEqual(a[key], b[key])) {
              return false;
            }
          }
          return true;
        }
      }
    }
  }
  return a === b;
}
