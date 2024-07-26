import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { loginUserController, registerNewUserController,refreshController, logoutController, sendResetEmailController, newPasswordController, getOAuthUrlController, googleAuthController} from '../controllers/auth.js';
import validateBody from '../utils/validateBody.js';
import { loginSchema, newPassword, passwordResetSchema, userGoogleAuthCodeSchema, userSchema } from '../validation/user-schema.js';

const userRouter = express.Router();

userRouter.post('/register',validateBody(userSchema), ctrlWrapper(registerNewUserController));

userRouter.post('/login', validateBody(loginSchema), ctrlWrapper(loginUserController));
export default userRouter;

userRouter.post('/refresh', ctrlWrapper(refreshController));

userRouter.post('/logout', ctrlWrapper(logoutController));

userRouter.post('/send-reset-email', validateBody(passwordResetSchema), ctrlWrapper(sendResetEmailController));

userRouter.post('/reset-pwd', validateBody(newPassword), ctrlWrapper(newPasswordController));

userRouter.get('/get-oauth-url', ctrlWrapper(getOAuthUrlController))

userRouter.post('/google-confirm', validateBody(userGoogleAuthCodeSchema), ctrlWrapper(googleAuthController));
