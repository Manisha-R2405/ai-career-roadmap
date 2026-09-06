import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewService } from '../services/index';
import { useAuthStore } from '../store/authStore';
import { FaArrowLeft, FaCheckCircle, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const InterviewPractice = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [token, roadmapId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [questionsRes, statsRes] = await Promise.all([
        interviewService.getQuestions(roadmapId),
        interviewService.getStats(roadmapId),
      ]);
      setQuestions(questionsRes.data.questions);
      setStats(statsRes.data.stats);
    } catch (error) {
      toast.error('Failed to load interview questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    try {
      await interviewService.submitAnswer(currentQuestion.id, { answer });
      toast.success('Answer submitted successfully');
      setSubmitted(true);
      setAnswer('');
    } catch (error) {
      toast.error('Failed to submit answer');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSubmitted(false);
      setAnswer('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSubmitted(false);
      setAnswer('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading interview questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <button
            onClick={() => navigate(`/roadmap/${roadmapId}`)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
          >
            <FaArrowLeft /> Back to Roadmap
          </button>
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">No interview questions available yet</p>
            <button
              onClick={() => navigate(`/roadmap/${roadmapId}`)}
              className="btn btn-primary"
            >
              Back to Roadmap
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <button
          onClick={() => navigate(`/roadmap/${roadmapId}`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <FaArrowLeft /> Back to Roadmap
        </button>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <p className="text-gray-600 text-sm">Total Questions</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total_questions}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 text-sm">Answered</p>
              <p className="text-2xl font-bold text-green-600">{stats.answered_questions}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.average_score ? stats.average_score.toFixed(1) : '0'}%
              </p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600 text-sm">Good Answers</p>
              <p className="text-2xl font-bold text-purple-600">{stats.good_answers}</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-bold text-gray-800">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="card mb-8">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestion.question}</h2>
            {currentQuestion.topic && (
              <p className="text-gray-600">Topic: {currentQuestion.topic}</p>
            )}
          </div>

          {currentQuestion.expected_concepts && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Expected Concepts:</p>
              <p className="text-gray-600">{currentQuestion.expected_concepts}</p>
            </div>
          )}
        </div>

        {/* Answer Input */}
        <div className="card mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Your Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer here..."
            className="input-field resize-none mb-4"
            rows="6"
          />
          {!submitted ? (
            <button
              onClick={handleSubmitAnswer}
              className="btn btn-primary w-full"
            >
              Submit Answer
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-green-800 font-medium">Answer submitted successfully!</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn btn-secondary flex-1 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="btn btn-primary flex-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPractice;
