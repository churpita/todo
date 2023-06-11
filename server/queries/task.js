const db = require("../util/database");

module.exports = class Task {
    static addTask(newTask) {
        return db.execute(
            `
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
        `,
            [newTask.task_key, newTask.title, newTask.description]
        );
    }

    static mapTask(newTaskMap) {
        return db.execute(
            `
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
        `,
            [
                newTaskMap.task_group_key,
                newTaskMap.task_key,
                newTaskMap.sequence,
            ]
        );
    }

    static updateTask(updatedTask) {
        return db.execute(
            `
            UPDATE task
            SET 
                title=?,
                description=?
            WHERE task_key = ?
        `,
            [updatedTask.title, updatedTask.description, updatedTask.task_key]
        );
    }

    static deleteTask(task_key) {
        return db.execute(
            `
            CALL delete_task(?);
        `,
            [task_key]
        );
    }

    static toggleTask(task_key) {
        return db.execute(
            `
            CALL toggle_task(?);
        `,
            [task_key]
        );
    }
};
