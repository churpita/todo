CREATE TABLE task (
  task_key      int           NOT NULL AUTO_INCREMENT,
  title         varchar(128)  NOT NULL,
  description   varchar(1024) NULL,
  is_completed  bit           NULL,
  PRIMARY KEY (task_key)
);

INSERT INTO task (task_key, title, description) VALUES (1, 'Work Task 1', 'Need to complete work task 1');
INSERT INTO task (task_key, title, description) VALUES (2, 'Work Task 2', 'Need to complete work task 2');
INSERT INTO task (task_key, title, description) VALUES (3, 'Personal Task 1', 'Need to complete personal task 1');
INSERT INTO task (task_key, title, description) VALUES (4, 'Personal Task 2', 'Need to complete personal task 2');

