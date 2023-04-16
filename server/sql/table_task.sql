CREATE TABLE task (
  task_key      int           NOT NULL AUTO_INCREMENT,
  title         varchar(128)  NOT NULL,
  description   varchar(1024) NULL,
  is_completed  tinyint       NULL,
  PRIMARY KEY (task_key)
);