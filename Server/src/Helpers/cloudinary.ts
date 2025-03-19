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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Utils Cloudinary
export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    // creons un data URI correct avec le MIME type
    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'image', // Spécifier explicitement le type
      transformation: [
        { width: 1080, crop: 'scale' },
        { quality: 'auto:best' },
      ],
    });
    
    return result;
  } catch (error) {
    console.error('Cloudinary Error Details:', error); // Afficher l'erreur détaillée
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};