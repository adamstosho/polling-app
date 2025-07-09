const Poll = require('../models/Poll');

// Helper function to recalculate vote counts
const recalculateVoteCounts = (poll) => {
  // Reset all option vote counts
  poll.options.forEach(option => {
    option.votes = 0;
  });
  
  // Count votes for each option
  poll.votes.forEach(vote => {
    const option = poll.options.find(opt => opt.text === vote.optionText);
    if (option) {
      option.votes += 1;
    }
  });
};

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options, expiresAt } = req.body;
    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: 'Question and at least two options are required.' });
    }
    const poll = new Poll({
      question,
      options: options.map(text => ({ text })),
      expiresAt,
      createdBy: req.user.userId,
    });
    await poll.save();
    return res.status(201).json({ message: 'Poll created successfully.', poll });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Get all polls (paginated)
exports.getAllPolls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const polls = await Poll.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Poll.countDocuments();
    return res.status(200).json({ polls, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Get single poll
exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found.' });
    return res.status(200).json({ poll });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Vote on poll
exports.votePoll = async (req, res) => {
  try {
    const { option } = req.body;
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found.' });
    if (poll.expiresAt && new Date() > poll.expiresAt) {
      return res.status(400).json({ message: 'Poll has expired.' });
    }
    
    // Check if option exists
    const optionExists = poll.options.find(o => o.text === option);
    if (!optionExists) return res.status(400).json({ message: 'Option not found.' });
    
    // Check if user already voted
    const existingVote = poll.votes.find(vote => vote.userId.toString() === req.user.userId);
    
    if (existingVote) {
      // User already voted, update their vote
      existingVote.optionText = option;
      existingVote.votedAt = new Date();
      await poll.save();
      recalculateVoteCounts(poll);
      await poll.save();
      return res.status(200).json({ message: 'Vote updated successfully.', poll });
    } else {
      // New vote
      poll.votes.push({
        userId: req.user.userId,
        optionText: option,
      });
      await poll.save();
      recalculateVoteCounts(poll);
      await poll.save();
      return res.status(200).json({ message: 'Vote recorded successfully.', poll });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Get poll results
exports.getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found.' });
    return res.status(200).json({ results: poll.options });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Delete poll
exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found.' });
    if (poll.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own polls.' });
    }
    await poll.deleteOne();
    return res.status(200).json({ message: 'Poll deleted.' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}; 