// importing document is needed for type safety n catching errors in realtime in typescript only, not needed when using js 
import mongoose, { Schema, Document } from "mongoose";


// data modelling interface for 'message'
// interface keyword is used to define an interface called message which will be included in the mongoose docuement
// hence extends Document is used

export interface Message extends Document {
    content: String;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        }
    })

// model for user

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username can't be null"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "enter a valid email"],    
    },

    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    verifyCode: {
        type: String,
        required: [true,"please enter your verification code!"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages:  [MessageSchema],
})


const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema))

export default UserModel;