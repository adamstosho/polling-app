const User = require('../models/User');
const Poll = require('../models/Poll');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

exports.getMyPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });
    return res.status(200).json({ polls });
  } catch (err) {
    return res.status(500).json({ message: 'Server error.' });
  }
}; 