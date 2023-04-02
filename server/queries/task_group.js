const db = require('../util/database');

module.exports = class TaskGroup {
    static fetchAllGroups() {
        return db.execute(`
            SELECT
                task_group_key, 
                title, 
                color
            FROM task_group
        `);
    }

    static fetchAllGroupMembers() {
        return db.execute(`
            SELECT
                TG.task_group_key,
                TGM.sequence,
                T.title,
                T.description,
                T.is_completed
            FROM task_group TG
            INNER JOIN task_group_member TGM
                ON TGM.task_group_key = TG.task_group_key
            INNER JOIN task T
                ON T.task_key = TGM.task_key
            ORDER BY TG.task_group_key ASC, TGM.sequence ASC
        `);
    }

    static addGroup(newGroup) {
        return db.execute(`
            INSERT INTO task_group
            (
                task_group_key,
                title, 
                color
            )
            VALUES 
            (
                ?,
                ?,
                ?
            )
        `, [newGroup.task_group_key, newGroup.title, newGroup.color]);
    }
}