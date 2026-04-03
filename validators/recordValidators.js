const { body, param, query } = require('express-validator');

const RECORD_TYPES = ['income', 'expense'];

const createRecordRules = [
  body('amount')
    .exists()
    .withMessage('Amount is required')
    .bail()
    .custom((value) => {
      if (value === null || value === '') {
        throw new Error('Amount cannot be empty');
      }
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isNaN(n)) {
        throw new Error('Amount must be a number');
      }
      if (n < 0) {
        throw new Error('Amount must be greater than or equal to 0');
      }
      return true;
    }),
  body('type')
    .exists({ checkFalsy: true })
    .withMessage('Type is required')
    .bail()
    .isString()
    .withMessage('Type must be a string')
    .trim()
    .isIn(RECORD_TYPES)
    .withMessage(`Type must be one of: ${RECORD_TYPES.join(', ')}`),
  body('category')
    .exists({ checkFalsy: true })
    .withMessage('Category is required')
    .bail()
    .isString()
    .withMessage('Category must be a string')
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Category must be at most 200 characters'),
  body('date')
    .exists({ checkFalsy: true })
    .withMessage('Date is required')
    .bail()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date string'),
  body('notes')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Notes must be a string')
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Notes must be at most 5000 characters'),
];

const getRecordsQueryRules = [
  query('type')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Type filter must be a string')
    .trim()
    .isIn(RECORD_TYPES)
    .withMessage(`Type filter must be one of: ${RECORD_TYPES.join(', ')}`),
  query('category')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Category filter must be a string')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Category filter must be between 1 and 200 characters'),
  query('dateFrom')
    .optional({ values: 'falsy' })
    .isISO8601()
    .withMessage('dateFrom must be a valid ISO 8601 date string'),
  query('dateTo')
    .optional({ values: 'falsy' })
    .isISO8601()
    .withMessage('dateTo must be a valid ISO 8601 date string'),
  query().custom((_, { req }) => {
    const { dateFrom, dateTo } = req.query;
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
      throw new Error('dateFrom must be on or before dateTo');
    }
    return true;
  }),
];

const updateRecordRules = [
  param('id')
    .exists()
    .withMessage('Record id is required')
    .bail()
    .isMongoId()
    .withMessage('Record id must be a valid MongoDB id'),
  body('amount')
    .optional()
    .custom((value) => {
      if (value === null || value === '') {
        throw new Error('Amount must be a number greater than or equal to 0');
      }
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isNaN(n) || n < 0) {
        throw new Error('Amount must be a number greater than or equal to 0');
      }
      return true;
    }),
  body('type')
    .optional()
    .isString()
    .withMessage('Type must be a string')
    .trim()
    .isIn(RECORD_TYPES)
    .withMessage(`Type must be one of: ${RECORD_TYPES.join(', ')}`),
  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Category must be at most 200 characters'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date string'),
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Notes must be at most 5000 characters'),
  body().custom((_, { req }) => {
    const b = req.body;
    const has = (key) => {
      const v = b[key];
      return v !== undefined && v !== null;
    };
    if (
      !has('amount') &&
      !has('type') &&
      !has('category') &&
      !has('date') &&
      !has('notes')
    ) {
      throw new Error(
        'Provide at least one of amount, type, category, date, or notes'
      );
    }
    return true;
  }),
];

const recordIdParamRules = [
  param('id')
    .exists()
    .withMessage('Record id is required')
    .bail()
    .isMongoId()
    .withMessage('Record id must be a valid MongoDB id'),
];

module.exports = {
  createRecordRules,
  getRecordsQueryRules,
  updateRecordRules,
  recordIdParamRules,
  RECORD_TYPES,
};
