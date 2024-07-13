import mongoose, { Document, Schema } from 'mongoose'


export interface IUsers extends Document {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema<IUsers>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
})


const userModel = mongoose.model<IUsers>("user", userSchema);

export default userModel;