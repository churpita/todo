CREATE TABLE task_group_member (
  task_group_key    int   NOT NULL,
  task_key          int   NOT NULL,
  sequence          int   NOT NULL,
  
  FOREIGN KEY (task_group_key) REFERENCES task_group(task_group_key),
  FOREIGN KEY (task_key) REFERENCES task(task_key)
);