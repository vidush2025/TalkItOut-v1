import {Router} from "express";
import {
    createChannel,
    getChannel
} from "../controllers/channel.controller.js"
import {
    sendMessage,
    getMessages
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

//channel routes
router.post("/channel", verifyJWT, createChannel);
router.get("/channel/:id", verifyJWT, getChannel);

//message routes
router.get("/message", verifyJWT, getMessages);

//voicenote feature
router.post(
    "/message",
    verifyJWT,
    upload.single("voice"),
    checkAudioDuration,
    sendMessage               
);



export default router;
