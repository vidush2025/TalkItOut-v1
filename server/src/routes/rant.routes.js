import { Router } from "express";

import { 
    postRant, 
    getRants, 
    deleteRant,
    } from "../controllers/rant.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { checkAudioDuration } from "../middlewares/audioCheck.middleware.js";

const router = Router();

router.post("/", verifyJWT, upload.single("voice"), checkAudioDuration, postRant);
router.get("/", verifyJWT, getRants);
router.delete("/:id", verifyJWT, deleteRant);

export default router;
