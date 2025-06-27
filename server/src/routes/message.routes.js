import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload, checkAudioDuration } from "../middlewares/multer.middleware.js";

const router = Router();

// Get all messages in a channel
router.get("/:channelId", verifyJWT, getMessages);

// Send message with optional voice note
router.post(
  "/",
  verifyJWT,
  upload.single("voice"),
  checkAudioDuration,
  sendMessage
);

export default router;
