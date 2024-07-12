import createHttpError from "http-errors";
import { findSession } from "../services/session.js";
import { findUser } from "../services/auth.js";

const authenticate = async (req, res, next) => {
const authHeader = req.get('Authorization');
if(!authHeader) {
    next(createHttpError(401, 'Authorization header missing'));
};
const [bearer, accessToken] = authHeader.split(' ');
if(!bearer) {
    next(createHttpError(401, 'Authorization header must be Bearer type'));
};
if(!accessToken) {
    next(createHttpError(401, 'accessToken is missing'));
};
const session = await findSession({accessToken});
if(!session) {
    next(createHttpError(401, 'Session not found'));
};

const accessTokenExpired = Date.now() > new Date(session.accessTokenValidUntil);
if(accessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
};

const user = await findUser({_id:session.userId});
if(!user) {
    next(createHttpError(401, 'User not found'));
};

req.user = user;
next();
};

export default authenticate;
