import { Router } from 'express'; 

import ttpController from '../controllers/ttpController';

const router: Router = Router();

router.post('/publishKey', ttpController.publishSharedKey);
router.get('/getKey', ttpController.getSharedKey);

export default router;