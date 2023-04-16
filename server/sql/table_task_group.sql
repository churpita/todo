CREATE TABLE task_group (
  task_group_key      int           NOT NULL AUTO_INCREMENT,
  title               varchar(128)  NOT NULL,
  color               varchar(6),
  PRIMARY KEY (task_group_key)
);