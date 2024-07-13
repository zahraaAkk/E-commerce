import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes';

const app = express()
const port = 3001;
app.use (express.json());

mongoose.connect('mongodb://127.0.0.1:27017/eCommerce')
    .then(() => console.log("db connected"))
    .catch((err) => console.log("faild to connect", err));


    app.listen(port , () => { 
        console.log("server is running on " , port)
    })

    app.use('/user' , userRouter)