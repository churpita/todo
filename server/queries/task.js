const db = require('../util/database');

module.exports = class Task {
    static addTask(newTask) {
        return db.execute(`
            INSERT INTO task
            (
                task_key,
                title, 
                description
            )
            VALUES 
            (
                ?,
                ?,
                ?
            )
        `, [newTask.task_key, newTask.title, newTask.description]);
    }

    static mapTask(newTaskMap) {
        return db.execute(`
            INSERT INTO task_group_member
            (
                task_group_key,
                task_key, 
                sequence
            )
            VALUES 
            (
                ?,
                ?,
                ?
            )
        `, [newTaskMap.task_group_key, newTaskMap.task_key, newTaskMap.sequence]);
    }
}