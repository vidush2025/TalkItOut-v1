import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const sendMessage = asyncHandler(async (req, res) => {
    const {channelId, content} = req.body;
    const senderId = req.user?._id;
    let voiceUrl = null;

    if(!channelId || !senderId)
        throw new ApiError(
            404,
            "Channel or User not found. Message could not be sent."   
        );

    if(!content && !req.file?.path)
        throw new ApiError(
            400,
            "Message was empty."
        );

    if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        voiceUrl = uploadResult?.secure_url;
    }
    
    const newMessage = await Message.create({
        channelId,
        senderId,
        content,
        voiceUrl,
        isRant: false
    });

    if(!newMessage)
        throw new ApiError(
            500,
            "Message could not be sent. Something went wrong."
        );
        
    const io = req.app.get("io");
    io.to(channelId).emit("recieve-message", newMessage);

    
    return res.status(200).json(
        new ApiResponse(
            200,
            newMessage,
            "Message sent successfully!"
        )
    );
});

const getMessages = asyncHandler(async(req, res)=> {
    const {channelId} = req.params;
    if(!channelId)
        throw new ApiError(
            400,
            "Channel-id is required."
        )
    const messages = await Message.find({
        channelId,
        isRant: {$ne: true}
    })
    .sort({createdAt : 1});

    if(messages.length === 0)
        return res.status(200).json(
        new ApiResponse(
            200,
            [],
            "No messages found in this conversation."
        )
    );
    
    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            messages.length === 0
                ? "No messages found in this conversation."
                : "Conversation fetched successfully!"
        )
    );
});

export {
    sendMessage,
    getMessages,
}