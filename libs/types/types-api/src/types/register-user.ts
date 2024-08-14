export type email = `${string}@${string}.${string}`; // /^[a-zA-Z0-9. _%+\\-!~]+@[a-zA-Z0-9-_.]+.[a-zA-Z]{2,}$/gi;

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
