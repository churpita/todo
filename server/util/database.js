const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'todo',
    user: 'root',
    password: 'password'
});

module.exports = pool.promise();