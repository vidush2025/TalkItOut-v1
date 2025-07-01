import { Channel } from "../models/channel.model.js";
import {nanoid} from "nanoid";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

function SuffixGenerater (len){
    let suff = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0; i<len; i++){
        const idx = Math.floor(Math.random() * chars.length);

        suff += chars[idx];
    }

    return suff;
}

const createChannel = asyncHandler(async(req, res) => {
    const channelId = nanoid(6) //5-6 chars

    const {name, isPublic = false} = req.body;

    const newChannel = await Channel.create({
        channelId,
        name: name || `Anonymous Room-${SuffixGenerater(4)}`,
        isPublic,
        createdBy: req.user?._id || null 
    });

    if(!newChannel){
        throw new ApiError(
            500,
            "New Channel could not be created."
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            newChannel,
            "Channel was created."
        )
    )
});

const getChannel = asyncHandler(async(req, res) => {
    const { channelId } = req.body

    if(!channelId)
        throw new ApiError(
            400,
            "Channel-id is required."
        )
    
    const currChannel = await Channel.findOne({channelId});

    if(!currChannel)
        throw new ApiError(
            400,
            "Channel not found."
        )

    return res.status(200).json(
        new ApiResponse(
            200,
            currChannel,
            "Channel was found successfully!"
        )
    )
});

const getAllPublicChannels = asyncHandler(async (req, res) => {
  const channels = await Channel.find({ isPublic: true });

  return res.status(200).json(
    new ApiResponse(
      200,
      channels,
      "Fetched all public channels."
    )
  );
});


export {
    createChannel,
    getChannel,
    getAllPublicChannels
}