import createHttpError from "http-errors";
import User from "../db/models/User.js";

import bcrypt from 'bcryptjs';

export const findUser = filter => User.findOne(filter);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const registerNewUser = async (data) => {
    const {email, password} = data;
    const user = await findUser({email});

    if(user) {
        throw createHttpError(409, 'Email in use');
    };

    const hashedPassword =await bcrypt.hash(password, 10);
    return User.create({...data, password:hashedPassword});
};


