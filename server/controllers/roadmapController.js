import { getDatabase } from '../database/init.js';
import { AppError } from '../middleware/errorHandler.js';

const db = getDatabase();

export const createRoadmap = (req, res, next) => {
  try {
    const {
      title,
      educationLevel,
      department,
      currentStage,
      targetRole,
      careerGoal,
      availableTime
    } = req.body;
    const userId = req.user.id;

    if (!title || !educationLevel || !department || !targetRole) {
      throw new AppError('Required fields missing', 400);
    }

    const stmt = db.prepare(`
      INSERT INTO roadmaps (
        user_id, title, education_level, department, 
        current_stage, target_role, career_goal, available_time
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      userId, title, educationLevel, department,
      currentStage, targetRole, careerGoal, availableTime
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'Roadmap created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getUserRoadmaps = (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const roadmaps = db.prepare(`
      SELECT * FROM roadmaps WHERE user_id = ? ORDER BY created_at DESC
    `).all(userId);

    res.json({ roadmaps });
  } catch (error) {
    next(error);
  }
};

export const getRoadmapById = (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user.id;

    const roadmap = db.prepare(
      'SELECT * FROM roadmaps WHERE id = ? AND user_id = ?'
    ).get(roadmapId, userId);

    if (!roadmap) {
      throw new AppError('Roadmap not found', 404);
    }

    const phases = db.prepare(
      'SELECT * FROM roadmap_phases WHERE roadmap_id = ? ORDER BY phase_number'
    ).all(roadmapId);

    res.json({ roadmap, phases });
  } catch (error) {
    next(error);
  }
};

export const getRoadmapPhases = (req, res, next) => {
  try {
    const { roadmapId } = req.params;

    const phases = db.prepare(`
      SELECT * FROM roadmap_phases WHERE roadmap_id = ? ORDER BY phase_number
    `).all(roadmapId);

    const phasesWithTasks = phases.map(phase => {
      const tasks = db.prepare(
        'SELECT * FROM roadmap_tasks WHERE phase_id = ?'
      ).all(phase.id);
      
      const skills = db.prepare(
        'SELECT * FROM roadmap_skills WHERE phase_id = ?'
      ).all(phase.id);

      return { ...phase, tasks, skills };
    });

    res.json({ phases: phasesWithTasks });
  } catch (error) {
    next(error);
  }
};

export const updateRoadmapProgress = (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    const { completionPercentage } = req.body;
    const userId = req.user.id;

    const stmt = db.prepare(`
      UPDATE roadmaps 
      SET completion_percentage = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `);

    stmt.run(completionPercentage, roadmapId, userId);

    res.json({ message: 'Roadmap progress updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteRoadmap = (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user.id;

    const stmt = db.prepare('DELETE FROM roadmaps WHERE id = ? AND user_id = ?');
    stmt.run(roadmapId, userId);

    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    next(error);
  }
};
