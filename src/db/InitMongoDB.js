import mongoose from "mongoose";
import env from "../utils/env.js";

const initMongoDB = async() => {
try {
    const DB_HOST = env('MONGO_URL');
    await mongoose.connect(DB_HOST);
    console.log('Mongo connection successfully established!')
} catch (error) {
console.log(`Some error with DB: ${error.message}`);
throw error;
}
};

export default initMongoDB;
