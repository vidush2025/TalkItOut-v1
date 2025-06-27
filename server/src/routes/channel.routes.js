import { Router } from "express";
import { createChannel, getChannel } from "../controllers/channel.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createChannel);
router.get("/:id", verifyJWT, getChannel);

export default router;
