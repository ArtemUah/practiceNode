import createHttpError from "http-errors";
import User from "../db/models/User.js";

import bcrypt from 'bcryptjs';


export const registerNewUser = async (data) => {
    const {email, password} = data;
    const findUser = await User.findOne({email});

    if(findUser) {
        throw createHttpError(409, 'Email in use');
    };

    const hashedPassword =await bcrypt.hash(password, 10);
    return User.create({...data, password:hashedPassword});
};
