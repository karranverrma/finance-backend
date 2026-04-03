const { validationResult } = require('express-validator');

async function runValidations(req, chains) {
  await Promise.all(chains.map((chain) => chain.run(req)));
  return validationResult(req);
}

function sendValidationError(res, validation) {
  const errors = validation.array({ onlyFirstError: false }).map((e) => ({
    field: e.path ?? e.type,
    message: e.msg,
  }));
  return res.status(400).json({
    message: 'Validation failed',
    errors,
  });
}

module.exports = { runValidations, sendValidationError };
