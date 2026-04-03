const Record = require('../models/Record');

async function getDashboardSummary(req, res) {
  try {
    const userId = req.user._id;

    const records = await Record.find({ createdBy: userId });

    // totals
    const totalIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    // ✅ category-wise totals
    const categoryTotals = {};
    records.forEach(r => {
      if (!categoryTotals[r.category]) {
        categoryTotals[r.category] = 0;
      }
      categoryTotals[r.category] += r.amount;
    });

    // ✅ recent activity (last 5)
    const recentTransactions = records
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // ✅ monthly trends
    const monthlyTrends = {};
    records.forEach(r => {
      const month = new Date(r.date).toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyTrends[month]) {
        monthlyTrends[month] = 0;
      }
      monthlyTrends[month] += r.amount;
    });

    return res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals,
      recentTransactions,
      monthlyTrends
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { getDashboardSummary };
