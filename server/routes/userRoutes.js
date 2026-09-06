import express from 'express';
import {
  updateUserProfile,
  getUserSkills,
  addUserSkill,
  deleteUserSkill,
  getUserInterests,
  addUserInterest,
  deleteUserInterest
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.put('/profile', updateUserProfile);
router.get('/skills', getUserSkills);
router.post('/skills', addUserSkill);
router.delete('/skills/:skillId', deleteUserSkill);
router.get('/interests', getUserInterests);
router.post('/interests', addUserInterest);
router.delete('/interests/:interestId', deleteUserInterest);

export default router;
