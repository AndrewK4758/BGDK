import { google, type Auth } from 'googleapis';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI);

export default oauth2Client;
