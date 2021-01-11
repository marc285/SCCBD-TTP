import { Router } from 'express';

import keyExchangeRoutes from './keyExchangeRoutes';
import ttpRoutes from './ttpRoutes';

const router: Router = Router();

router.use('/keyExchange', keyExchangeRoutes);
router.use('/ttp', ttpRoutes);

export default router;