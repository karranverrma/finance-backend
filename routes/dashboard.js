const express = require('express');
const { authenticate } = require('../middleware/auth');
const { allowRoles } = require('../middleware/allowRoles');
const { getDashboardSummary } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', authenticate, allowRoles('admin', 'analyst', 'viewer'), getDashboardSummary);

module.exports = router;