const Record = require('../models/Record');

async function createRecord(req, res) {
  try {
    let { amount, type, category, date, notes } = req.body;

<<<<<<< HEAD
    // ✅ Validation
=======
    // ✅ Required fields validation
>>>>>>> b5b9e41 (final fixes: validation, filtering, dashboard improvements)
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ Normalize input (VERY IMPORTANT for filtering)
    type = type.toLowerCase();
    category = category.trim().toLowerCase();

    // ✅ Type validation
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: "Invalid type (must be income or expense)" });
    }

    // ✅ Amount validation
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const record = await Record.create({
      amount: Number(amount),
      type,
      category,
      date: new Date(date),
      notes,
      createdBy: req.user._id
    });

    return res.status(201).json({ record });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getRecords(req, res) {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = { createdBy: req.user._id };

<<<<<<< HEAD
    // ✅ Filtering by type
    if (type) filter.type = type;

    // ✅ Filtering by category
    if (category) filter.category = category;

    // ✅ Filtering by date range
=======
    // ✅ Normalize type
    if (type) {
      filter.type = type.toLowerCase();
    }

    // ✅ Normalize category
    if (category) {
      filter.category = category.trim().toLowerCase();
    }

    // ✅ Date filtering
>>>>>>> b5b9e41 (final fixes: validation, filtering, dashboard improvements)
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(filter)
      .sort({ createdAt: -1 });

    return res.json({ records });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateRecord(req, res) {
  try {
    const { type, amount } = req.body;

    // ✅ Optional validation on update
    if (type && !['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (amount && (isNaN(amount) || amount <= 0)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.json({ record });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function deleteRecord(req, res) {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.json({ message: "Deleted successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
};
