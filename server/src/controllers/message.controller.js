import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
    const {channelId, content} = req.body;
    const senderId = req.user?._id;

    if(!channelId || !senderId)
        throw new ApiError(
            404,
            "Channel or User not found. Message could not be sent."   
        );

    if(!content && !voiceUrl)
        throw new ApiError(
            400,
            "Message was empty."
        );

    let voiceUrl = null;

    if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        voiceUrl = uploadResult?.secure_url;
    }
    
    const newMessage = await Message.create({
        channelId,
        senderId,
        content,
        voiceUrl,
    });

    if(!newMessage)
        throw new ApiError(
            500,
            "Message could not be sent. Something went wrong."
        );
    
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
    const messages = await Message.find({channelId})
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
            "Conversation fetched successfully!"
        )
    );
});

export {
    sendMessage,
    getMessages,
}