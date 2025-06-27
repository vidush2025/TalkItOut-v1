import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name :{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    rantPreferences:{
        autoDelete:{
            type: Boolean,
            default: true
        },
        deleteAfter:{
            type: Number, //in hours
            default: 1
        }
    }

}, {timestamps: true});



userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 7);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = new mongoose.model("User", userSchema);

 

