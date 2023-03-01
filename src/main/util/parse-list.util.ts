export function parseList(value?: string, separator = ','): any[] {
  if (!value) {
    return [];
  }

  const list = value
    .split(separator)
    .map((item) => item.trim())
    .filter((item) => !!item);

  if (!list.length) {
    return [];
  }

  return list;
}
