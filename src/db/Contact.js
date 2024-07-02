import mongoose from "mongoose";

const types = ['work', 'home', 'personal'];
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
    enum: types,
    default: 'personal',
}
},
{
    timestamps: true,
    versionKey: false,
  });

const Contact = mongoose.model('my-contacts', contactSchema);

export default Contact;
