export const HASHER_ADAPTER = Symbol('HASHER');
export const SALT = Symbol('SALT');

export interface HasherAdapter {
  hash(value: string): Promise<string>;
}
