const util = require('util');
const mysql = require('mysql');
const config = require('../configuration/config');

const dbPool = mysql.createPool({
    connectionLimit: 200, //important
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    debug: false
});

// Ping database to check for common exception errors.
dbPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;
})

// Promisify for Node.js async/await.
dbPool.query = util.promisify(dbPool.query);

module.exports = dbPool
