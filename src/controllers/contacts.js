import { getAllContacts, getContactById } from "../services/contact-services.js";

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
