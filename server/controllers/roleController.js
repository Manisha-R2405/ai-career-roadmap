import { getDatabase } from '../database/init.js';
import { AppError } from '../middleware/errorHandler.js';

const db = getDatabase();

export const getAllRoles = (req, res, next) => {
  try {
    const roles = db.prepare('SELECT * FROM roles ORDER BY role_name').all();
    res.json({ roles });
  } catch (error) {
    next(error);
  }
};

export const getRolesByDepartment = (req, res, next) => {
  try {
    const { department } = req.params;
    
    const roles = db.prepare(
      'SELECT * FROM roles WHERE department = ? ORDER BY role_name'
    ).all(department);

    res.json({ roles });
  } catch (error) {
    next(error);
  }
};

export const getRoleById = (req, res, next) => {
  try {
    const { roleId } = req.params;

    const role = db.prepare('SELECT * FROM roles WHERE id = ?').get(roleId);

    if (!role) {
      throw new AppError('Role not found', 404);
    }

    const skills = db.prepare(
      'SELECT * FROM role_skills WHERE role_id = ? ORDER BY importance DESC'
    ).all(roleId);

    const projects = db.prepare(
      'SELECT * FROM projects WHERE role_id = ? ORDER BY difficulty'
    ).all(roleId);

    res.json({ role, skills, projects });
  } catch (error) {
    next(error);
  }
};

export const getRoleProjects = (req, res, next) => {
  try {
    const { roleId } = req.params;

    const projects = db.prepare(
      'SELECT * FROM projects WHERE role_id = ? ORDER BY difficulty'
    ).all(roleId);

    res.json({ projects });
  } catch (error) {
    next(error);
  }
};
