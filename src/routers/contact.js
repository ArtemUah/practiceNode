import express from 'express';
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, upsertContactController } from '../controllers/contacts.js';
import isValid from '../utils/isValid.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';


const contactRoute = express.Router();

contactRoute.get('/', ctrlWrapper(getAllContactsController));

contactRoute.get('/:id', isValid, ctrlWrapper(getContactByIdController));

contactRoute.post('/', ctrlWrapper(addContactController));

contactRoute.delete('/:id', ctrlWrapper(deleteContactController));

contactRoute.put('/:id', ctrlWrapper(upsertContactController));

contactRoute.patch('/:id', ctrlWrapper(patchContactController));

export default contactRoute;
