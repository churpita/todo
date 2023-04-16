INSERT INTO task_group (task_group_key, title, color) VALUES (1, 'Work Tasks', '2688B6');
INSERT INTO task_group (task_group_key, title, color) VALUES (2, 'Personal Tasks', 'B62626');

INSERT INTO task (task_key, title, description) VALUES (1, 'Work Task 1', 'Need to complete work task 1');
INSERT INTO task (task_key, title, description) VALUES (2, 'Work Task 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO task (task_key, title, description) VALUES (3, 'Personal Task 1', 'Need to complete personal task 1');
INSERT INTO task (task_key, title, description, is_completed) VALUES (4, 'Personal Task 2', 'Need to complete personal task 2', 1);

INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (1, 1, 1);
INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (1, 2, 2);
INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (2, 3, 1);
INSERT INTO task_group_member (task_group_key, task_key, sequence) VALUES (2, 4, 2);