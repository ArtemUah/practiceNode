import setupServer from "./src/server.js";
import initMongoConnection from "./src/db/initMongoConnection.js";
//Password mango cluster
//PJgBWrDuwDWJyzcq
//Login:
// artemshukatka

const bootstrat = async () => {
    await initMongoConnection();
    setupServer();
};

bootstrat();
