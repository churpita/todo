const express = require("express");

const taskController = require("../controllers/task");

const router = express.Router();

// POST /add-task
router.post("/add-task", taskController.addTask);

// PUT /update-group
router.put("/update-task", taskController.updateTask);

// DELETE /delete-task
router.delete("/delete-task", taskController.deleteTask);

// POST /toggle-task
router.put("/toggle-task", taskController.toggleTask);

module.exports = router;
