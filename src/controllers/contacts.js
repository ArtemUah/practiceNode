import createHttpError from "http-errors";
import { addContact, deleteContact, getAllContacts, getContactById, upsertContact } from "../services/contact-services.js";

export const getAllContactsController = async(req,res) => {
    const result = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result
    });
  };

  export const getContactByIdController = async(req, res) => {
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
};

export const addContactController = async (req, res) => {
  const result = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message:'Successfully created a contact!',
    data: result
  });
};

export const deleteContactController = async(req, res, next) => {
  const {id} = req.params;
  const result = await deleteContact(id);

  if(!result) {
    next(createHttpError('404', 'Contact not found'));
    return;
  };

  res.status(204).json({
    status: 204,
  });
};


export const upsertContactController = async(req, res) => {
  const {id} = req.params;
  const result = await upsertContact({_id:id}, req.body, {upsert:true});

  const status = result.isNew ? 200 : 201;

  const message = result.isNew ? 'Contact succesfully added' : 'Contact successfully put';

  res.json({
    status,
    message,
    data: result,
  });
};

export const patchContactController = async (req, res, next) => {
  const {id} = req.params;
  const result = await upsertContact({_id:id}, req.body);

  if(!result) {
    next(createHttpError('404', 'Contact not found'));
    return;
  };

  console.log(result);

  res.status(200).json({
    status:200,
    message: 'Successfully patched a contact!',
    data: result
  });
}
