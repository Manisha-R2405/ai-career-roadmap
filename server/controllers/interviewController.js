import { getDatabase } from '../database/init.js';
import { AppError } from '../middleware/errorHandler.js';

const db = getDatabase();

export const getInterviewQuestions = (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user.id;

    // Verify roadmap belongs to user
    const roadmap = db.prepare(
      'SELECT id FROM roadmaps WHERE id = ? AND user_id = ?'
    ).get(roadmapId, userId);

    if (!roadmap) {
      throw new AppError('Roadmap not found', 404);
    }

    const questions = db.prepare(`
      SELECT * FROM interview_questions WHERE roadmap_id = ? ORDER BY difficulty
    `).all(roadmapId);

    res.json({ questions });
  } catch (error) {
    next(error);
  }
};

export const getQuestionById = (req, res, next) => {
  try {
    const { questionId } = req.params;
    const userId = req.user.id;

    const question = db.prepare(
      'SELECT * FROM interview_questions WHERE id = ?'
    ).get(questionId);

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    const answers = db.prepare(
      'SELECT * FROM interview_answers WHERE question_id = ? AND user_id = ?'
    ).all(questionId, userId);

    res.json({ question, answers });
  } catch (error) {
    next(error);
  }
};

export const submitAnswer = (req, res, next) => {
  try {
    const { questionId } = req.params;
    const { answer } = req.body;
    const userId = req.user.id;

    if (!answer) {
      throw new AppError('Answer is required', 400);
    }

    const stmt = db.prepare(`
      INSERT INTO interview_answers (question_id, user_id, answer)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(questionId, userId, answer);

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'Answer submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAnswerFeedback = (req, res, next) => {
  try {
    const { answerId } = req.params;
    const userId = req.user.id;

    const answer = db.prepare(
      'SELECT * FROM interview_answers WHERE id = ? AND user_id = ?'
    ).get(answerId, userId);

    if (!answer) {
      throw new AppError('Answer not found', 404);
    }

    res.json({ answer });
  } catch (error) {
    next(error);
  }
};

export const getInterviewStats = (req, res, next) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.user.id;

    // Verify roadmap belongs to user
    const roadmap = db.prepare(
      'SELECT id FROM roadmaps WHERE id = ? AND user_id = ?'
    ).get(roadmapId, userId);

    if (!roadmap) {
      throw new AppError('Roadmap not found', 404);
    }

    const stats = db.prepare(`
      SELECT 
        COUNT(DISTINCT iq.id) as total_questions,
        COUNT(DISTINCT ia.id) as answered_questions,
        AVG(COALESCE(ia.score, 0)) as average_score,
        COUNT(DISTINCT CASE WHEN ia.score >= 70 THEN ia.id END) as good_answers
      FROM interview_questions iq
      LEFT JOIN interview_answers ia ON iq.id = ia.question_id
      WHERE iq.roadmap_id = ? AND ia.user_id = ?
    `).get(roadmapId, userId);

    res.json({ stats });
  } catch (error) {
    next(error);
  }
};
