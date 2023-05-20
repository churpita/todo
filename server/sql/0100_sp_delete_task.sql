USE todo;

DROP PROCEDURE IF EXISTS delete_task;
DELIMITER //
CREATE PROCEDURE delete_task(IN tk int)
BEGIN
    SET SQL_SAFE_UPDATES = 0;

    -- First delete the task group members
    DELETE tgm
    FROM task_group_member tgm
    WHERE tgm.task_key = tk;

    -- Then delete the tasks
    DELETE t
    FROM task t
    WHERE t.task_key = tk;

    SET SQL_SAFE_UPDATES = 1;
END //
DELIMITER ;