const Task = require("../models/taskSchema");

module.exports.createTask = async (req, res) => {
    try {
      req.body.assignedBy = req.user._id;
      const task = await Task.create(req.body);
      res.status(201).json({ success: true, task });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

module.exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
};
