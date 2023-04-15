const express = require('express');

const taskGroupController = require('../controllers/task_group');

const router = express.Router();

// GET /groups
router.get('/groups', taskGroupController.getGroups);

// POST /add-group
router.post('/add-group', taskGroupController.addGroup);

// PUT /update-group
router.put('/update-group', taskGroupController.updateGroup);

// DELETE /delete-group
router.delete('/delete-group', taskGroupController.deleteGroup);

module.exports = router;