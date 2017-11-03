var mysql = require('mysql');
var dbConfig = require('../config/db_config.json')

var pool = mysql.createPool(dbConfig);

exports.query = (next, sql, data, callback) => {
    pool.getConnection((err, connection) => {
        if (err) return next(err);
        console.log('has connect.');
        connection.query(sql, data, (error, results, fields) => {
            if (!!callback) {
                callback(results, fields);
            }
            connection.release();
            if (error) return next(error);
        });
    });
}

