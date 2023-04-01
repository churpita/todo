const express = require('express');

const taskGroupController = require('../controllers/task_group');

const router = express.Router();

// GET /groups
router.get('/groups', taskGroupController.getGroups);

module.exports = router;