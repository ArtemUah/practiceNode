import {v2 as cloudinary} from 'cloudinary';
import fs from 'node:fs/promises';

import env from '../utils/env.js';

const cloud_name = env('CLOUDINARY_NAME');
const api_key= env('CLOUDINARY_KEY');
const api_secret = env('CLOUDINARY_SECRET_KEY');

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure:true,
});

export const saveFileToCloudinary = async (file) => {

    const response = await cloudinary.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
};


