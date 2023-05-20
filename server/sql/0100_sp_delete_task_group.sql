USE todo;

DROP PROCEDURE IF EXISTS delete_task_group;
DELIMITER //
CREATE PROCEDURE delete_task_group(IN tgk int)
BEGIN
    SET SQL_SAFE_UPDATES = 0;

    -- Create temporary table with all tasks we will have to delete before deleting the group
    CREATE TEMPORARY TABLE tasks_to_delete ENGINE=MEMORY SELECT task_key FROM task_group_member WHERE task_group_key = tgk;
    
    -- First delete the task group members
    DELETE tgm
    FROM task_group_member tgm
    INNER JOIN tasks_to_delete ttd
        ON tgm.task_key = ttd.task_key;

    -- Then delete the tasks
    DELETE t
    FROM task t
    INNER JOIN tasks_to_delete ttd
        ON t.task_key = ttd.task_key;

    -- Now that all child tasks have been deleted, delete the group
    DELETE FROM task_group where task_group_key = tgk;

    -- Task cleanup
    DROP TABLE tasks_to_delete;
    SET SQL_SAFE_UPDATES = 1;
END //
DELIMITER ;