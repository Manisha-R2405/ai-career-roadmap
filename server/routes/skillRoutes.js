import express from 'express';
import {
  getAllSkills,
  getSkillsByDepartment,
  getSkillsByRole
} from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/department/:department', getSkillsByDepartment);
router.get('/role/:roleId', getSkillsByRole);

export default router;
