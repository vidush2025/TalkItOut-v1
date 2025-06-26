import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    channelId:{
        type: String,
        required: true
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
    }
}, {timestamps: true});

export const Message = new mongoose.model("Message", messageSchema);