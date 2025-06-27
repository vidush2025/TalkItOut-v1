import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const postRant = asyncHandler(async (req, res) => {
  const { content, deleteAfter = null } = req.body;
  const senderId = req.user?._id;

  let voiceUrl = null;

  if (!content && !req.file?.path) {
    throw new ApiError(400, "Rant must include text or voice note.");
  }

  if (req.file?.path) {
    const uploadResult = await uploadOnCloudinary(req.file.path);
    voiceUrl = uploadResult?.secure_url;
  }

  const newRant = await Message.create({
    senderId,
    content,
    voiceUrl,
    isRant: true,
    deleteAfter,
    channelId: null
  });

  if (!newRant) {
    throw new ApiError(500, "Rant could not be created.");
  }

  return res.status(201).json(
    new ApiResponse(201, newRant, "Rant created successfully.")
  );
});

const getRants = asyncHandler(async (req, res) => {
  const senderId = req.user._id;

  const rants = await Message.find({ senderId, isRant: true }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, rants, "Fetched all your rants.")
  );
});

const deleteRant = asyncHandler(async (req, res) => {
  const rantId = req.params.id;
  const userId = req.user._id;

  const rant = await Message.findOne({ _id: rantId, senderId: userId, isRant: true });

  if (!rant) {
    throw new ApiError(404, "Rant not found.");
  }

  await Message.findByIdAndDelete(rantId);

  return res.status(200).json(
    new ApiResponse(200, null, "Rant deleted successfully.")
  );
});

export {
  postRant,
  getRants,
  deleteRant
};
