import multer from "multer";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg"; 

const tempDir = path.join(process.cwd(), "public", "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only voice notes (audio) are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const checkAudioDuration = (req, res, next) => {
  if (!req.file?.path) return next();

  ffmpeg.ffprobe(req.file.path, (err, metadata) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Could not read audio file metadata." });
    }

    const duration = metadata.format.duration;
    if (duration > 60) {
      // Delete the file if too long
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: "Voice note must be under 1 minute." });
    }

    next();
  });
};

export { upload, checkAudioDuration };
