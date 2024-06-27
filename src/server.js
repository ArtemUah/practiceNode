import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';

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

    app.get('/', (req, res)=>{
        res.json({
            message:'Hello world',
        });
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message:"Not found"
        });
    });

    app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`));
};


export default setupServer;
