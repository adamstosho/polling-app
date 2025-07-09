const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const createPollLimiter = rateLimit({
  windowMs: 60 * 10 * 1000, // 1 hour
  max: 10,
  message: { message: 'Too many requests. Please Try after 10 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const votePollLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  message: { message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Create poll (protected, rate-limited)
router.post('/', auth, createPollLimiter, pollController.createPoll);
// Get all polls
router.get('/', pollController.getAllPolls);
// Get single poll
router.get('/:id', pollController.getPoll);
// Vote on poll (protected, rate-limited)
router.post('/:id/vote', auth, votePollLimiter, pollController.votePoll);
// Get poll results
router.get('/:id/results', pollController.getPollResults);
// Delete poll (protected)
router.delete('/:id', auth, pollController.deletePoll);

module.exports = router; 