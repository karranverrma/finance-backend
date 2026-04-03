const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {
  createUserRules,
  updateUserRoleStatusRules,
} = require('../validators/userValidators');
const { runValidations, sendValidationError } = require('../utils/validation');

async function createUser(req, res) {
  try {
    const validation = await runValidations(req, createUserRules);
    if (!validation.isEmpty()) {
      return sendValidationError(res, validation);
    }

    const { name, email, password, role, status } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ...(role !== undefined && { role }),
      ...(status !== undefined && { status }),
    });

    const safe = user.toObject();
    delete safe.password;
    return res.status(201).json({ user: safe });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateUserRoleStatus(req, res) {
  try {
    const validation = await runValidations(req, updateUserRoleStatusRules);
    if (!validation.isEmpty()) {
      return sendValidationError(res, validation);
    }

    const { role, status } = req.body;

    const updates = {};
    if (role !== undefined) updates.role = role;
    if (status !== undefined) updates.status = status;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  updateUserRoleStatus,
};
