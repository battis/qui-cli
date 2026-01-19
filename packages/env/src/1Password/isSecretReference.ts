export function isSecretReference(value: unknown) {
  return (
    value &&
    value !== null &&
    typeof value === 'string' &&
    /^op:\/\//.test(value)
  );
}
