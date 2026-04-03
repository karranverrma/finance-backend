const Record = require('../models/Record');

async function createRecord(req, res) {
  try {
    const { amount, type, category, date, notes } = req.body;

    // ✅ Validation (correct placement)
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date,
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
    const records = await Record.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({ records });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateRecord(req, res) {
  try {
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