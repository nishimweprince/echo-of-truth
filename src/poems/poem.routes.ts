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

// UPDATE MULTIPLE POEMS
router.patch('/', PoemController.updateMultiplePoems);

// UPDATE POEM
router.patch('/:id', PoemController.updatePoem);

export default router;
