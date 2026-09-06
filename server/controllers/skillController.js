import { getDatabase } from '../database/init.js';
import { AppError } from '../middleware/errorHandler.js';

const db = getDatabase();

export const getAllSkills = (req, res, next) => {
  try {
    const skills = db.prepare(`
      SELECT DISTINCT skill_name 
      FROM user_skills 
      ORDER BY skill_name
    `).all();

    res.json({ skills: skills.map(s => s.skill_name) });
  } catch (error) {
    next(error);
  }
};

export const getSkillsByDepartment = (req, res, next) => {
  try {
    const { department } = req.params;
    
    const skills = db.prepare(`
      SELECT DISTINCT rs.skill_name, rs.importance
      FROM role_skills rs
      JOIN roles r ON rs.role_id = r.id
      WHERE r.department = ?
      ORDER BY rs.importance DESC, rs.skill_name
    `).all(department);

    res.json({ skills });
  } catch (error) {
    next(error);
  }
};

export const getSkillsByRole = (req, res, next) => {
  try {
    const { roleId } = req.params;
    
    const skills = db.prepare(`
      SELECT skill_name, importance
      FROM role_skills
      WHERE role_id = ?
      ORDER BY importance DESC
    `).all(roleId);

    res.json({ skills });
  } catch (error) {
    next(error);
  }
};
