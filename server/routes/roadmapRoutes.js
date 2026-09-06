import express from 'express';
import {
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  getRoadmapPhases,
  updateRoadmapProgress,
  deleteRoadmap
} from '../controllers/roadmapController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createRoadmap);
router.get('/', getUserRoadmaps);
router.get('/:roadmapId', getRoadmapById);
router.get('/:roadmapId/phases', getRoadmapPhases);
router.put('/:roadmapId/progress', updateRoadmapProgress);
router.delete('/:roadmapId', deleteRoadmap);

export default router;
