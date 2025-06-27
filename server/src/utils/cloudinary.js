import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) {
      console.error("❌ No local path provided for upload.");
      return null;
    }

    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "video", //audio is also recognised as video
    });

    console.log("✅ File uploaded to Cloudinary:", result.secure_url);

    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
      console.log("🧹 Temp file removed:", localPath);
    }

    return result;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
        console.log("🧹 Temp file removed after error:", localPath);
      } catch (unlinkErr) {
        console.error("❌ Failed to delete temp file:", unlinkErr.message);
      }
    }

    return null;
  }
};


export {uploadOnCloudinary}