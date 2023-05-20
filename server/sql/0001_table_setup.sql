CREATE DATABASE todo;
USE todo;

CREATE TABLE task (
    task_key            int             NOT NULL AUTO_INCREMENT,
    title               varchar(128)    NOT NULL,
    description         varchar(1024)   NULL,
    is_completed        tinyint         NULL,
    PRIMARY KEY (task_key)
);

CREATE TABLE task_group (
    task_group_key      int             NOT NULL AUTO_INCREMENT,
    title               varchar(128)    NOT NULL,
    color               varchar(6)      NOT NULL,
    PRIMARY KEY (task_group_key)
);

CREATE TABLE task_group_member (
    task_group_key      int             NOT NULL,
    task_key            int             NOT NULL,
    sequence            int             NOT NULL,
    FOREIGN KEY (task_group_key) REFERENCES task_group(task_group_key),
    FOREIGN KEY (task_key) REFERENCES task(task_key)
);