import express from 'express';
import {
  getInterviewQuestions,
  getQuestionById,
  submitAnswer,
  getAnswerFeedback,
  getInterviewStats
} from '../controllers/interviewController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/roadmap/:roadmapId', getInterviewQuestions);
router.get('/question/:questionId', getQuestionById);
router.post('/question/:questionId/answer', submitAnswer);
router.get('/answer/:answerId/feedback', getAnswerFeedback);
router.get('/roadmap/:roadmapId/stats', getInterviewStats);

export default router;
