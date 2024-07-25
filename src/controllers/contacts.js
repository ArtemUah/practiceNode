import { deleteContact, getAllContacts, getContactById, postContact, upsertContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import parsPaginationParams from "../utils/parsPaginationParams.js";
import parsSortParams from "../utils/parsSortParams.js";
import parsFilterParams from "../utils/parsFilterParams.js";
import {saveFileToCloudinary} from "../utils/saveFileToCloudinary.js";
import saveFileToPublicDir from "../utils/saveFileToPublicDir.js";


export const getAllContactsController = async(req,res)=>{
    const {_id: userId} = req.user;
    const {page, perPage} = parsPaginationParams(req.query);
    const {sortBy, sortOrder} = parsSortParams(req.query);
    const filter = {...parsFilterParams({...req.query}),  userId};

    const data = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter
    });

    res.json({
      status:200,
      message:"Successfully found contacts!",
      data
    });
  };

  export const getContactByIdController = async(req, res)=>{
    const {_id: userId} = req.user;

     const {id} = req.params;
     const data = await getContactById({_id: id, userId});
     if(!data) {
    throw createHttpError(404, 'Contact not found');
     }
     res.json({
       status: 200,
       message:`Successfully found contact with id ${id}!`,
       data
     });

   };

   export const postContactController = async (req, res) => {
    const {_id: userId} = req.user;
    const photo = req.file;

    let photoUrl = '';
    if(photo) {
     photoUrl = await saveFileToPublicDir(req.file);
     console.log(photoUrl);
    };


    const result = await postContact({...req.body, userId, photo: photoUrl});

    res.status(201).json({
      status:201,
      message:'Successfully created a contact!',
      data: result,
    });
   };

   export const deleteContactController = async (req, res) => {
    const {_id: userId} = req.user;

    const {id} = req.params;
    const result = await deleteContact({_id:id, userId});

    if(!result) {
      throw (createHttpError(404, 'Contact not found'));
    };

    res.status(204).json({});
  };

  export const upsertContactController = async (req, res) => {
    const {_id: userId} = req.user;
    const {id} = req.params;
    const result = await upsertContact({_id:id, userId}, req.body, {upsert:true});

    const status = result.isNew ? 201 : 200;
    const message = result.isNew ? 'Contact successfully added' : 'Contact successfully updated';

    res.status(status).json({
      status,
      message,
      data: result.data.value,
    });

    };

    export const updateContactController = async (req, res) => {
      const {_id: userId} = req.user;
      const {id} = req.params;
      const result = await upsertContact({_id:id, userId}, req.body);

      if(!result) {
        throw createHttpError(404, 'Contact not found');
      };

      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.data.value
      });
    };
