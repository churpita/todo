INSERT INTO task_group (task_group_key, title, color) VALUES (1, 'Work Tasks', '2688B6');
INSERT INTO task_group (task_group_key, title, color) VALUES (2, 'Personal Tasks', 'B62626');

INSERT INTO task (task_key, title, description) VALUES (1, 'Open ticket for bug finding', 'Found that the application does not allow end users to re-order tasks. Maybe this can be resolved with drag and drop implementation?');
INSERT INTO task (task_key, title, description) VALUES (2, 'Document API endpoints', null);
INSERT INTO task (task_key, title, description) VALUES (3, 'Book hair appointment', null);
INSERT INTO task (task_key, title, description, is_completed) VALUES (4, 'Check emails', null, 1);

INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (1, 1, 1);
INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (1, 2, 2);
INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (2, 3, 1);
INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (2, 4, 2);