import type { Auth } from 'googleapis';

const userTokensMap = new Map<string, Auth.Credentials>();

export default userTokensMap;
