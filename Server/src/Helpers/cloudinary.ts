import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../core/config/env';
import multer from 'multer';
// Configuration Cloudinary
cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET,
});

// Configuration Multer
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    console.log("Début de l'upload sur Cloudinary...");
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const startTime = Date.now();
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'image',
      transformation: [
        { width: 1080, crop: 'scale' },
        { quality: 'auto:best' },
      ],
    });
    const elapsedTime = Date.now() - startTime;
    console.log(`Upload réussi en ${elapsedTime} ms. Résultat:`, result);

    return result;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};
