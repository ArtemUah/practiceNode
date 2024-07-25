import createHttpError from "http-errors";
import { findUser, registerNewUser, updateUser } from "../services/auth.js";
import bcrypt from 'bcryptjs';
import {createSession, deleteSession, findSession} from "../services/session.js";
import 'dotenv/config';
import sendEmail from "../utils/sendEmail.js";
import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env;

export const registerNewUserController = async (req, res) => {
    const result = await registerNewUser(req.body);
    console.log(result);
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

export const sendResetEmailController = async(req, res) => {
const {email} = req.body;
const user = await findUser({email});


if(!user) {
    throw createHttpError(404, 'User not found');
};

const{SMPT_UKRNET_FROM, SMPT_DOMAIN } = process.env;

const resetToken = jwt.sign(
    {
    id:user._id,
    email
},
JWT_SECRET,
{
    expiresIn: '15m',
}
);

const nodemailOptions = {
    from: SMPT_UKRNET_FROM,
    to: user.email,
    subject: 'Reset password',
    html:`<p>Click <a href="${SMPT_DOMAIN}?token=${resetToken}">here</a> to reset your password!</p>`
};


await sendEmail(nodemailOptions);

res.status(200).json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {}
});

};

export const newPasswordController = async(req, res) => {
    const{password, token} = req.body;


    try {
        const {email} = jwt.verify(token, JWT_SECRET);
        const user = await findUser({email});
        if(!user) {
            throw createHttpError(404, 'User not found!');
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await updateUser({email}, {password: hashedPassword});

    } catch (error) {
        throw createHttpError(401, 'Token is expired or invalid.');
    }

    res.status(200).json({
            status: 200,
            message: "Password has been successfully reset.",
            data: {}
    });

};
