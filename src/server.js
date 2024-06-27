import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contact-services.js';

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

    app.get('/contacts', async(req,res) => {
      const result = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: result
      });
    });

    app.get('/contacts/:id', async(req, res) => {
      const {id} = req.params;
      const result = await getContactById(id);

      if(!result) {
        return res.status(404).json({
          message: `Contact with id ${id} not found`
        });
      }

      res.json({
        status: 200,
        message:`Successfully found contact with id ${id}!`,
        data: result
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
