import { Router } from 'express'; 

import keyExchangeController from '../controllers/keyExchangeController';

const router: Router = Router();

router.post('/server', keyExchangeController.serverKeyExchange);
router.post('/client', keyExchangeController.clientKeyExchange);

export default router;