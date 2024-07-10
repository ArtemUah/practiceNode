import mongoose from "mongoose";
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
}
},
{
    timestamps: true,
    versionKey: false,
  });

const Contact = mongoose.model('test-contacts', contactSchema);

export default Contact;
