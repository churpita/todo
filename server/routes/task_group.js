const express = require('express');

const taskGroupController = require('../controllers/task_group');

const router = express.Router();

// GET /groups
router.get('/groups', taskGroupController.getGroups);

// POST /add-group
router.post('/add-group', taskGroupController.addGroup);

module.exports = router;