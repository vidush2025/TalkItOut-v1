import mongoose, {Schema} from "mongoose";

const rantSchema = new Schema({

}, {timestamps: true})

export const Rant = mongoose.model("Rant", rantSchema);