import createHttpError from "http-errors";
import { findUser, registerNewUser } from "../services/auth.js";
import bcrypt from 'bcryptjs';
import createSession from "../services/session.js";

export const registerNewUserController = async (req, res) => {
    const result = await registerNewUser(req.body);
    console.log(req.body);
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
    res.cookie('userId', session.userId, {
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
