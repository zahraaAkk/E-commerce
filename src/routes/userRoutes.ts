import express from 'express';
import { login, register } from '../services/userService';

const userRouter = express.Router();



userRouter.post('/register', async (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    const {statusCode , data } = await register({ firstName, lastName, email, password });
    response.status(statusCode).send(data)
})

userRouter.post('/login', async (request, response) => {
    const { email, password } = request.body;
    const {statusCode , data } = await login({email , password });
    response.status(statusCode).send(data)
})


export default userRouter