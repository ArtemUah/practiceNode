import Joi from 'joi';

export const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(20). required(),
    phoneNumber : Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20),
});


export const updateContactSchema = Joi({
    name: Joi.string().min(3).max(20),
    phoneNumber : Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20),
});
