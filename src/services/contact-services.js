import Contact from "../db/models/Contact.js";

export const getAllContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);