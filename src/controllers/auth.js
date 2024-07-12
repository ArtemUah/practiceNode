import createHttpError from "http-errors";
import { findUser, registerNewUser } from "../services/auth.js";
import bcrypt from 'bcryptjs';
import {createSession, deleteSession, findSession} from "../services/session.js";

export const registerNewUserController = async (req, res) => {
    const result = await registerNewUser(req.body);
    const data = {
        name: result.name,
        email: result.email,
    };
    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data,
    });
};

export const loginUserController = async (req, res) => {
    const {email, password} = req.body;
    const user = await findUser({email});

    if(!user) {
        throw createHttpError(401, 'User is not found');
    };

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw createHttpError(401, 'User is not found');
    };

    const session = await createSession(user._id);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expired: session.refreshTokenValidUntil,
    });
    res.cookie('sessionId', session.userId, {
        httpOnly: true,
        expired: session.refreshTokenValidUntil,
    });

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        }
    });

};

export const refreshController = async (req, res) => {
   const {refreshToken, sessionId} = req.cookies;

   const currentSession = await findSession({refreshToken, userId: sessionId});
    if(!currentSession) {
        throw createHttpError(401, 'Session not found');
    };

    const refreshTokenExpired = Date.now() > new Date(currentSession.refreshToken);
    if(refreshTokenExpired) {
        throw createHttpError(401, 'Session expired');
    };

    const newSession = await createSession(currentSession.userId);

    res.cookie('refreshToken', newSession.refreshToken, {
        httpOnly: true,
        expired: newSession.refreshTokenValidUntil,
    });
    res.cookie('sessionId', newSession.userId, {
        httpOnly: true,
        expired: newSession.refreshTokenValidUntil,
    });

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: newSession.accessToken,
        }
    });
};


export const logoutController = async (req, res) => {
    const {sessionId} = req.cookies;
    if(!sessionId) {
        throw createHttpError(401, 'Session not found');
    };

    await deleteSession({sessionId});

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.clearCookie('userid');

    res.status(204).send();

};
