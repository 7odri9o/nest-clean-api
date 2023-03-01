export const AUTHENTICATION = Symbol('AUTHENTICATION');

export type AuthenticationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<string | null>;
}
