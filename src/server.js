import express from 'express';
import cors from 'cors';

const setupServer = () => {
    const app = express();

    app.use(cors);
    const PORT = 3000;

    app.get('/', (req, res)=>{
        res.json({
            message:'Hello world',
        });
    });

    app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`));
};


export default setupServer;
