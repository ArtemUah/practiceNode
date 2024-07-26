import { OAuth2Client } from 'google-auth-library';

import path from 'node:path';
import fs from 'node:fs/promises';

import env from '../utils/env.js';
import createHttpError from 'http-errors';

const googleAuthConfigurePath = path.resolve('google-auth.json');
const googleAuthConfigureFile = JSON.parse(await fs.readFile(googleAuthConfigurePath));

const clientId = env('GOOGLE_CLIENT_ID');
const clientSecret = env('GOOGLE_CLIENT_SECRET');

const googleAuthClient = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: googleAuthConfigureFile.web.redirect_uris[0]
});

export const generateAuthUrl = () => {
return googleAuthClient.generateAuthUrl({
scope:[
'https://www.googleapis.com/auth/userinfo.email',
'https://www.googleapis.com/auth/userinfo.profile',
]
});
};

export const getGoogleOAuthName = ({given_name, family_name}) => {
if ( given_name & family_name) return `${given_name} ${family_name}`;
if(given_name) return `${given_name}`;
if(family_name) return `${family_name}`;
return 'User';
};

export const validateGoogleAuthCode = async (code) => {
const response = await googleAuthClient.getToken(code);
if(!response.tokens.id_token){
throw createHttpError(401, 'Google OAuth code invalid');
};

const ticket = await googleAuthClient.verifyIdToken({
    idToken: response.tokens.id_token
});
return ticket;
};
