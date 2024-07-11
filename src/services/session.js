import {randomBytes} from 'node:crypto';
import { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE } from '../constants/index.js';
import Session from '../db/models/Session.js';

 const createSession = userId => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFE);
    const refreshTokenValidUntil =new Date(Date.now() + REFRESH_TOKEN_LIFE);

    return Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    });
};

export default createSession;