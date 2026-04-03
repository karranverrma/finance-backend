const mongoose = require('mongoose');
const Record = require('../models/Record');

function toObjectId(userId) {
  if (userId instanceof mongoose.Types.ObjectId) return userId;
  if (typeof userId === 'string' && mongoose.Types.ObjectId.isValid(userId)) {
    return new mongoose.Types.ObjectId(userId);
  }
  throw new Error('Invalid user id');
}

async function getFinancialSummary(userId, options = {}) {
  const recentLimit = Math.min(Math.max(Number(options.recentLimit) || 10, 1), 100);
  const createdBy = toObjectId(userId);

  const [row] = await Record.aggregate([
    { $match: { createdBy } },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              totalIncome: {
                $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
              },
              totalExpense: {
                $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalIncome: 1,
              totalExpense: 1,
              netBalance: { $subtract: ['$totalIncome', '$totalExpense'] },
            },
          },
        ],
        categoryTotals: [
          {
            $group: {
              _id: '$category',
              income: {
                $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
              },
              expense: {
                $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
              },
            },
          },
          {
            $project: {
              _id: 0,
              category: '$_id',
              income: 1,
              expense: 1,
              net: { $subtract: ['$income', '$expense'] },
            },
          },
          { $sort: { category: 1 } },
        ],
        recentTransactions: [
          { $sort: { date: -1, createdAt: -1 } },
          { $limit: recentLimit },
          {
            $project: {
              _id: 1,
              amount: 1,
              type: 1,
              category: 1,
              date: 1,
              notes: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        totals: { $arrayElemAt: ['$totals', 0] },
        categoryTotals: 1,
        recentTransactions: 1,
      },
    },
  ]);

  const totals = row?.totals;
  const totalIncome = totals?.totalIncome ?? 0;
  const totalExpense = totals?.totalExpense ?? 0;
  const netBalance =
    totals?.netBalance ?? totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryTotals: row?.categoryTotals ?? [],
    recentTransactions: row?.recentTransactions ?? [],
  };
}

module.exports = { getFinancialSummary };
