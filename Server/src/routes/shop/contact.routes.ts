import { Router } from 'express';
import { sendContactIssue } from '../../controllers/shop/contact.controller';
const router = Router();

router.post('/send',sendContactIssue);

export default router;

