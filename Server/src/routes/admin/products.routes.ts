import { Router } from 'express';

import { handleImageUpload } from "../../controllers/admin/products.controller";
import { upload } from "../../Helpers/cloudinary";

const router = Router();

router.post("/upload-image",upload.single("my_file"),handleImageUpload)

export default router