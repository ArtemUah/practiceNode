import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { loginUserController, registerNewUserController } from '../controllers/auth.js';
import validateBody from '../utils/validateBody.js';
import { loginSchema, userSchema } from '../validation/user-schema.js';

const userRouter = express.Router();

userRouter.post('/register',validateBody(userSchema), ctrlWrapper(registerNewUserController));

userRouter.post('/login', validateBody(loginSchema), ctrlWrapper(loginUserController));
export default userRouter;
