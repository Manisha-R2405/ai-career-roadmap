import { getDatabase } from '../database/init.js';
import { AppError } from '../middleware/errorHandler.js';

const db = getDatabase();

export const updateUserProfile = (req, res, next) => {
  try {
    const { name, education_level, department, current_stage } = req.body;
    const userId = req.user.id;

    const stmt = db.prepare(`
      UPDATE users 
      SET name = ?, education_level = ?, department = ?, current_stage = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(name || null, education_level || null, department || null, current_stage || null, userId);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserSkills = (req, res, next) => {
  try {
    const userId = req.user.id;
    const skills = db.prepare(`
      SELECT id, skill_name, skill_level, created_at 
      FROM user_skills 
      WHERE user_id = ?
    `).all(userId);

    res.json({ skills });
  } catch (error) {
    next(error);
  }
};

export const addUserSkill = (req, res, next) => {
  try {
    const { skillName, skillLevel } = req.body;
    const userId = req.user.id;

    if (!skillName) {
      throw new AppError('Skill name is required', 400);
    }

    const stmt = db.prepare(`
      INSERT INTO user_skills (user_id, skill_name, skill_level)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(userId, skillName, skillLevel || 'beginner');

    res.status(201).json({
      id: result.lastInsertRowid,
      skillName,
      skillLevel: skillLevel || 'beginner'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserSkill = (req, res, next) => {
  try {
    const { skillId } = req.params;
    const userId = req.user.id;

    const stmt = db.prepare('DELETE FROM user_skills WHERE id = ? AND user_id = ?');
    stmt.run(skillId, userId);

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getUserInterests = (req, res, next) => {
  try {
    const userId = req.user.id;
    const interests = db.prepare(`
      SELECT id, interest, created_at 
      FROM user_interests 
      WHERE user_id = ?
    `).all(userId);

    res.json({ interests });
  } catch (error) {
    next(error);
  }
};

export const addUserInterest = (req, res, next) => {
  try {
    const { interest } = req.body;
    const userId = req.user.id;

    if (!interest) {
      throw new AppError('Interest is required', 400);
    }

    const stmt = db.prepare(`
      INSERT INTO user_interests (user_id, interest)
      VALUES (?, ?)
    `);

    const result = stmt.run(userId, interest);

    res.status(201).json({
      id: result.lastInsertRowid,
      interest
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserInterest = (req, res, next) => {
  try {
    const { interestId } = req.params;
    const userId = req.user.id;

    const stmt = db.prepare('DELETE FROM user_interests WHERE id = ? AND user_id = ?');
    stmt.run(interestId, userId);

    res.json({ message: 'Interest deleted successfully' });
  } catch (error) {
    next(error);
  }
};
