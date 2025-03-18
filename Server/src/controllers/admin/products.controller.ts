import { Request, Response } from 'express';
import { uploadToCloudinary } from '../../Helpers/cloudinary';

export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    console.log('Received file:', req.file); // Log the received file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier téléchargé',
      });
    }
    console.log('Uploading to Cloudinary...'); // Log before uploading

    const result = await uploadToCloudinary(req.file);
    console.log('Upload successful:', result); // Log the result

    res.status(200).json({
      success: true,
      message: 'Image uploaded with success',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'upload",
      error: error.message,
    });
  }
};