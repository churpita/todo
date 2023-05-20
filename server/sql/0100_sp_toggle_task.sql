USE todo;

DROP PROCEDURE IF EXISTS toggle_task;
DELIMITER //
CREATE PROCEDURE toggle_task(IN tk int)
BEGIN
    SET SQL_SAFE_UPDATES = 0;

    SELECT is_completed INTO @currentCompleteStatus FROM task WHERE task_key = tk;

    UPDATE task
    SET is_completed = 
        CASE (@currentCompleteStatus)
            WHEN 1 THEN NULL
            ELSE 1
        END
    WHERE task_key = tk;

    SET SQL_SAFE_UPDATES = 1;
END //
DELIMITER ;