import express from 'express';
import {
  getAllRoles,
  getRolesByDepartment,
  getRoleById,
  getRoleProjects
} from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getAllRoles);
router.get('/department/:department', getRolesByDepartment);
router.get('/:roleId', getRoleById);
router.get('/:roleId/projects', getRoleProjects);

export default router;
