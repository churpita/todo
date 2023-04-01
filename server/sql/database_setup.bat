mysql --user=root --password=password --database=todo < script_drop_tables.sql

mysql --user=root --password=password --database=todo < table_task.sql
mysql --user=root --password=password --database=todo < table_task_group.sql
mysql --user=root --password=password --database=todo < table_task_group_member.sql