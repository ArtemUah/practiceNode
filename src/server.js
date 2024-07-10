import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import userRouter from './routers/auth.js';

const port = env('PORT', '3000');

const setupServer = () => {

const app = express();

// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);
app.use('/auth', userRouter);

app.use('*', notFoundHandler);

app.use(errorHandler);

app.listen(port, ()=> console.log(`Server is running in PORT ${port}`));

};

export default setupServer;
