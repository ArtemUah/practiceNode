import express from 'express';
import { deleteContactController, getAllContactsController, getContactByIdController, postContactController, updateContactController, upsertContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { addContactSchema, updateContactSchema } from '../validation/contacts-schema.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', validateBody(addContactSchema), ctrlWrapper(postContactController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

contactsRouter.put('/:id', ctrlWrapper(upsertContactController));

contactsRouter.patch('/:id', validateBody(updateContactSchema), ctrlWrapper(updateContactController));

export default contactsRouter;
