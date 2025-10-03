import { Router } from 'express';

import {
	handleImageUpload,
	addProduct,
	fetchAllProducts,
	deleteProducts,
	editProducts,
	deleteImageFromCloudinary
} from '../../controllers/admin/products.controller';
import { upload } from '../../Helpers/cloudinary';

const router = Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProducts);
router.get('/get', fetchAllProducts);
router.delete('/delete/:id', deleteProducts);
router.delete('/delete-image', deleteImageFromCloudinary);

export default router;
