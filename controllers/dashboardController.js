const Record = require('../models/Record');

async function getDashboardSummary(req, res) {
  try {
    const records = await Record.find({ createdBy: req.user._id });

    const income = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const expense = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const net = income - expense;

    return res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: net,
      count: records.length
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { getDashboardSummary };