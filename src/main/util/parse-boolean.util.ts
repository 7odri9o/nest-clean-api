export function parseBoolean(value: string): boolean {
  const thruthyValues = ['true', 'True', 'TRUE', '1'];
  return thruthyValues.includes(value);
}
