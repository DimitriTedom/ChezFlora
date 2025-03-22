import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../core/config/env';
import multer from 'multer';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET,
});

// Configuration Multer (stockage en mémoire)
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Upload de l'image sans transformation
export const uploadToCloudinary = async (file: Express.Multer.File) => {
  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  return await cloudinary.uploader.upload(dataUri, { resource_type: 'image' });
};
