import { parseFile } from "music-metadata";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const checkAudioDuration = async (req, res, next) => {
  if (!req.file?.path) return next();

  try {
    const metadata = await parseFile(req.file.path);
    const duration = metadata.format.duration; // duration in seconds

    if (duration > 60) {
      // delete file if too long
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: "Voice note must be under 1 minute.",
      });
    }

    next();
  } catch (error) {
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({
      success: false,
      message: "Could not read audio metadata.",
    });
  }
};


export { checkAudioDuration };