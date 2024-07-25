import mongoose, { Schema } from "mongoose";
import { typesForSchema } from "../constants/constants.js";

const contactSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
phoneNumber: {
    type: String,
    required: true
},
email: {
    type: String,
    required: false
},
isFavourite: {
    type: Boolean,
    default: false
},
contactType: {
    type: String,
    required: false,
    enum: typesForSchema,
    default: 'personal',
},
userId: {
    type: Schema.Types.ObjectId,
    required: true,
},
photo: {
    type: String,
    required: false,
},
},
{
    timestamps: true,
    versionKey: false,
  });

const Contact = mongoose.model('test-contacts', contactSchema);

export default Contact;
