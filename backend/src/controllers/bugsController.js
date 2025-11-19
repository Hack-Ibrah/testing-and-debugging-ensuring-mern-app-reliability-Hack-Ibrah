const Bug = require('../models/bug');
const { validateBug } = require('../helpers/validation');

// Create
exports.createBug = async (req, res, next) => {
  try {
    const { error } = validateBug(req.body);
    if (error) {
      const err = new Error(error);
      err.status = 400;
      throw err;
    }
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) { next(err); }
};

// List
exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) { next(err); }
};

// Update
exports.updateBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    if (!bug) {
      const err = new Error('Bug not found');
      err.status = 404;
      throw err;
    }
    res.json(bug);
  } catch (err) { next(err); }
};

// Delete
exports.deleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findByIdAndDelete(id);
    if (!bug) {
      const err = new Error('Bug not found');
      err.status = 404;
      throw err;
    }
    res.json({ success: true });
  } catch (err) { next(err); }
};
