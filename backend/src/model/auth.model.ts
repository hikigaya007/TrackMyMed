import mongoose, { Document } from 'mongoose';

// Interface for the Auth document
interface IAuth extends Document {
    username: string;
    password: string
}

// Auth schema definition
const authschema = new mongoose.Schema({
    username: {
        type: String ,
        required: true,
        unique : true
    } ,
    password: {
        type: String ,
        required : true
    }
});

// Auth model
const Auth = mongoose.model<IAuth>('Auth', authschema);

export default Auth;
