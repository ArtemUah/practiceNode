import { registerNewUser } from "../services/auth.js";

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
