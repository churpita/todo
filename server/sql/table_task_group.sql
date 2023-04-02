CREATE TABLE task_group (
  task_group_key      int           NOT NULL AUTO_INCREMENT,
  title               varchar(128)  NOT NULL,
  color               varchar(6),
  PRIMARY KEY (task_group_key)
);

INSERT INTO task_group (task_group_key, title, color) VALUES (1, 'Work Tasks', '2688B6');
INSERT INTO task_group (task_group_key, title, color) VALUES (2, 'Personal Tasks', 'B62626');