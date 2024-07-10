import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { registerNewUserController } from '../controllers/auth.js';
import validateBody from '../utils/validateBody.js';
import { userSchema } from '../validation/user-schema.js';

const userRouter = express.Router();

userRouter.post('/register',validateBody(userSchema), ctrlWrapper(registerNewUserController));


export default userRouter;
