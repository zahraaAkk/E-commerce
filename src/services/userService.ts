import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface LoginParams {
    email: string;
    password: string;
}
export const register = async ({ firstName, lastName, email, password }: RegisterParams) => {
    //first we check if the user email is alrady exist 
    const findUser = await userModel.findOne({ email })
    if (findUser) {
        return { data: "user alrady exists! ", statusCode: 400 }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({ firstName, lastName, email, password: hashedPassword })
    await newUser.save()

    return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
}

export const login = async ({ email, password }: LoginParams) => {
    const findUser = await userModel.findOne({ email })
    if (!findUser) {
        return { data: "Incorrect credentials", statusCode: 400 }

    }

    // const passwordMatch = password === findUser.password
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
        return { data: generateJWT({ email, firstName: findUser.firstName, lastName: findUser.lastName }), statusCode: 200 }; //lezem bel jwt raje3 string mesh object ermel hek bhadedlo l data l bade yeha badel ma raje3lo kel userdata 
    }
    return { data: "Incorrect email or password", statusCode: 400 }

}

const generateJWT = (data: any) => {
    return jwt.sign(data, 'pIxdL4mQbMXe47VzZ4GKKcumJpcVKiR4', { expiresIn: '24h' }) //function l bt3mal encryption , bt5od l data w secret key, eza ma 3arafet l expiresIn l token ma bt3mal expire 
}