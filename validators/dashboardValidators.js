const { query } = require('express-validator');

const getDashboardQueryRules = [
  query('recentLimit')
    .optional({ values: 'falsy' })
    .isInt({ min: 1, max: 100 })
    .withMessage('recentLimit must be an integer between 1 and 100'),
];

module.exports = { getDashboardQueryRules };
