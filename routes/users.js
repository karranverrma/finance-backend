const express = require('express');
const { authenticate } = require('../middleware/auth');
const { allowRoles } = require('../middleware/allowRoles');
const {
  createUser,
  getAllUsers,
  updateUserRoleStatus,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', authenticate, allowRoles('admin'), createUser);
router.get('/', authenticate, allowRoles('admin', 'analyst'), getAllUsers);
router.patch('/:id', authenticate, allowRoles('admin'), updateUserRoleStatus);

module.exports = router;