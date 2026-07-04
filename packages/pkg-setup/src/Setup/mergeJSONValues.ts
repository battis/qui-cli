import { JSONValue } from '@battis/descriptive-types';

export function mergeJSONValues(src: JSONValue, dest: JSONValue) {
  if (typeof dest === 'object' && typeof src === 'object') {
    if (Array.isArray(dest) && Array.isArray(src)) {
      return [...new Set([...dest, ...src])];
    } else {
      return { ...dest, ...src };
    }
  } else {
    return src;
  }
}
