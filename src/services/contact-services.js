import Contact from "../db/models/Contact.js";

export const getAllContacts = () => Contact.find();

export const getContactById = id => Contact.findById(id);

export const addContact = data => Contact.create(data);

export const deleteContact = id => Contact.findOneAndDelete(id);

export const upsertContact = async(filter, data, options={}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {new: true,
        includeResultMetadata: true,
        ...options,});

        if(!result || !result.value) return null;

        return {
            data: result.value,
            isNew: Boolean(result?.lastErrorObject?.upserted)
        };
};


