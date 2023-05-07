const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

// POST /add-task
router.post('/add-task', taskController.addTask);

// POST /toggle-task
router.post('/toggle-task', taskController.toggleTask);

module.exports = router;