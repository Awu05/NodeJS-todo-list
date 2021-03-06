CREATE TABLE todo_data (
    id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    name CHAR(256) NOT NULL,
    created_date DATETIME DEFAULT (datetime('now')),
    status CHAR(256) DEFAULT('NOT STARTED')
);

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'todo_list')
BEGIN
    PRINT 'Table Exists'
END