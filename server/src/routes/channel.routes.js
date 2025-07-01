import { Router } from "express";
import { createChannel, getAllPublicChannels, getChannel } from "../controllers/channel.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyJWT, getAllPublicChannels)
router.post("/createChannel", verifyJWT, createChannel);
router.get("/:id", verifyJWT, getChannel);

export default router;
