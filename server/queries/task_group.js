const db = require('../util/database');

module.exports = class TaskGroup {
    static fetchAllGroups() {
        return db.execute(`
            SELECT
                task_group_key, 
                title, 
                background_color
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
        `);
    }

    static fetchGroupMembers(task_group_key) {
        return db.execute(`
            SELECT 
                TGM.sequence, 
                T.title, 
                T.description,
                T.is_completed
            FROM task_group_member TGM
            INNER JOIN task T
                ON T.task_key = TGM.task_key
            WHERE TGM.task_group_key = ?
        `, [task_group_key]);
    }
}