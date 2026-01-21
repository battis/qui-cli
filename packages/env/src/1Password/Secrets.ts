export type Reference = {
  vault: string;
  item: string;
  section?: string;
  field: string;
};

export function isRef(value: unknown): boolean {
  return (
    !!value &&
    value !== null &&
    typeof value === 'string' &&
    /^op:\/\//.test(value)
  );
}

export function explodeRef(ref: string): Reference {
  // eslint-disable-next-line prefer-const
  let [vault, item, section, field] = ref.replace(/^op:\/\//, '').split('/');
  if (field === undefined) {
    field = section;
    section = '';
  }
  return { vault, item, section, field };
}
