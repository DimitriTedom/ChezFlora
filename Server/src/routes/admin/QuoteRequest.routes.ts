import { Router } from 'express';
import { getAllQuotesofAllUsers, getQuotesDetailsForAdmin, updateQuotesRequestStatus } from '../../controllers/admin/Quote.controller';
const router = Router();

router.get('/get',getAllQuotesofAllUsers);
router.get('/details/:id',getQuotesDetailsForAdmin);
router.put('/update/:id',updateQuotesRequestStatus);

export default router