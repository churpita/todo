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

