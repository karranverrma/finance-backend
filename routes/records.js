const express = require('express');
const { authenticate } = require('../middleware/auth');
const { allowRoles } = require('../middleware/allowRoles');
const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordController');

const router = express.Router();

router.post('/', authenticate, allowRoles('admin'), createRecord);
router.get('/', authenticate, allowRoles('admin', 'analyst'), getRecords);
router.patch('/:id', authenticate, allowRoles('admin'), updateRecord);
router.delete('/:id', authenticate, allowRoles('admin'), deleteRecord);

module.exports = router;