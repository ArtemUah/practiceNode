import express from 'express';
import { getAllContactsController, getContactByIdController } from '../controllers/contacts.js';
import isValid from '../utils/isValid.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';


const contactRoute = express.Router();

contactRoute.get('/', ctrlWrapper(getAllContactsController));

contactRoute.get('/:id', isValid, ctrlWrapper(getContactByIdController));

export default contactRoute;
