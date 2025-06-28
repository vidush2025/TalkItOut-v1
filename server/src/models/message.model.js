import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    channelId:{
        type: String,
        required: true,
        default: null // null if it's a Rant
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        default: ""
    },
    voiceUrl: {
        type: String,
        default: null
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 43200 //12hrs (in seconds)
    },
    isRant: {
        type: Boolean,
        default: false
    },
    deleteAfter: {
        type: Number, // in hours
        default: null
    }
}, {timestamps: true});

export const Message = new mongoose.model("Message", messageSchema);