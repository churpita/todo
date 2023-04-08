const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

// POST /add-task
router.post('/add-task', taskController.addTask);

module.exports = router;