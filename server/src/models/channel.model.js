import mongoose, {Schema} from "mongoose";

const channelSchema = new Schema({
    channelId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: "Anonymous Chat-Room"
    },
    isPublic:{
        type: Boolean,
        default: false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true});

export const Channel = new mongoose.model("Channel", channelSchema);