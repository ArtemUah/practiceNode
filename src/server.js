import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';
import contactRoute from './routers/contact.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';


const setupServer = () => {
    const app = express();

    const PORT = env('PORT');

    app.use(cors());

    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
      );

    app.use('/contacts', contactRoute);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`));
};


export default setupServer;
