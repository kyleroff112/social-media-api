const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Thought = require('../models/thought');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT (update) a user by id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a user by id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new thought to a user
router.post('/:userId/thoughts', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const thought = new Thought(req.body);
    thought.username = user.username;
    await thought.save();
    user.thoughts.push(thought._id);
    await user.save();
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new friend to a user
router.post('/:userId/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const friend = await User.findOne({ username: req.body.username });
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Already friends' });
    }
    user.friends.push(friend._id);
    await user.save();
    res.json(user);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    }
    });
    
    // DELETE a friend from a user
    router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (!user) {
    return res.status(404).json({ error: 'User not found' });
    }
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
    return res.status(404).json({ error: 'Friend not found' });
    }
    user.friends.pull(friend._id);
    await user.save();
    res.json(user);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
    }
    });
    
    module.exports = router;
