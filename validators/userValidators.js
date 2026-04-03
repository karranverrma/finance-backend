const { body, param } = require('express-validator');

const ROLES = ['admin', 'analyst', 'viewer'];
const STATUSES = ['active', 'inactive'];

const createUserRules = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Name must be at most 200 characters'),
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .bail()
    .isString()
    .withMessage('Email must be a string')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),
  body('password')
    .exists()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters'),
  body('role')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Role must be a string')
    .isIn(ROLES)
    .withMessage(`Role must be one of: ${ROLES.join(', ')}`),
  body('status')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Status must be a string')
    .isIn(STATUSES)
    .withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
];

const updateUserRoleStatusRules = [
  param('id')
    .exists()
    .withMessage('User id is required')
    .bail()
    .isMongoId()
    .withMessage('User id must be a valid MongoDB id'),
  body('role')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Role must be a string')
    .isIn(ROLES)
    .withMessage(`Role must be one of: ${ROLES.join(', ')}`),
  body('status')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Status must be a string')
    .isIn(STATUSES)
    .withMessage(`Status must be one of: ${STATUSES.join(', ')}`),
  body().custom((_, { req }) => {
    if (req.body.role === undefined && req.body.status === undefined) {
      throw new Error('Provide at least one of role or status');
    }
    return true;
  }),
];

module.exports = {
  createUserRules,
  updateUserRoleStatusRules,
  ROLES,
  STATUSES,
};
