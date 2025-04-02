import { Router } from 'express';
import { addQuoteRequest, fetchAllQuoteRequests,getQuoteRequestDetail } from '../../controllers/shop/QuoteRequest.controller';
const router = Router();

router.post('/add',addQuoteRequest);
router.get('/get/:userId',fetchAllQuoteRequests);
router.get('/details/:id',getQuoteRequestDetail);

export default router;
