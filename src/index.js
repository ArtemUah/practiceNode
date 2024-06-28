import initMongoDB from "./db/InitMongoDB.js";
import setupServer from "./server.js";

const bootstrap = async() =>{
await initMongoDB();
setupServer();
};

bootstrap();
