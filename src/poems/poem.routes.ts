import { Router } from 'express';
import { PoemController } from './poem.controller';

const router = Router();

// CREATE POEM
router.post('/', PoemController.createPoem);

// FETCH POEMS
router.get('/', PoemController.fetchPoems);

// GET POEM BY MESSAGE ID
router.get('/:messageId', PoemController.getPoemByMessageId);

// DELETE POEM
router.delete('/', PoemController.deletePoem);

export default router;
