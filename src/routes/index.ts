import { Router } from 'express';
import poemRoutes from '../poems/poem.routes';

const router = Router();

router.use('/poems', poemRoutes);

export default router;
