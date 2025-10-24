import dotenv from "dotenv";
import cloudinary from "cloudinary";
import path from "path";

dotenv.config();

const url = process.env.CLOUDINARY_URL;
if (!url) {
  console.error("❌ CLOUDINARY_URL missing in .env");
  process.exit(1);
}

const match = url.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
if (!match) {
  console.error("❌ Invalid CLOUDINARY_URL format");
  process.exit(1);
}

const [, apiKey, apiSecret, cloudName] = match;

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

async function testUpload() {
  const filePath = path.resolve("MAC-Velvet-Teddy.jpg");
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: "lipdoppel/test",
    });
    console.log("✅ Upload successful!");
    console.log("URL:", result.secure_url);
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
  }
}

testUpload();
