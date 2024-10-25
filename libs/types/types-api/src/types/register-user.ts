// /^[a-zA-Z0-9. _%+\\-!~]+@[a-zA-Z0-9-_.]+.[a-zA-Z]{2,}$/gi;
export type EmailAddress = `${string}@${string}.${string}`;

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
