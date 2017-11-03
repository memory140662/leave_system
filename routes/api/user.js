var express = require('express');
var router = express.Router();
var query = require('../../lib/db_connection').query;
var utils = require('../../lib/utils');
//var jwt = require('jsonwebtoken');

function selectAllUser(next, res) {
    query(next, 'SELECT _id, username, admin FROM user', {}, (results, fields) => {
        res.end(JSON.stringify(results));
    });
}


// Read
router.get('/', (req, res, next) => {
    selectAllUser(next, res);
});
router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    query(next, 'SELECT  _id, username, admin FROM user WHERE _id = ?', [id], (results, fields) => {
        res.end(JSON.stringify(results[0]));
    });
});

// Create
router.post('/', (req, res, next) => {
    var user = req.body;
    query(next, 'INSERT INTO user SET ?', user, () => {
        selectAllUser(next,res);
    });
});

router.post('/login', (req, res, next)=> {
    let user = req.body;
    let token = '';
    let username = '';
    let id = '';
    let admin = 'N';

    query(next, 
        'SELECT  _id, username, admin FROM user WHERE UPPER(username) = UPPER(?) AND password = ?', 
        [user.username, user.password], 
        (results, fields) => {
            console.log(results);
            if (results.length > 0) {
                username = results[0].username;
                id = results[0]._id;
                admin = results[0].admin;
                // token =  jwt.sign({
                //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
                //     data:results[0]
                // }, 'secret');
            }
            res.end(JSON.stringify({
                id,
                username,
                admin,
                token
            }));
        }
    );
});

//Update
router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    var user = req.body;
    var result = utils.composeUpdateSql(user, 'user');
    result.values.push(id);
    console.log(result.sql);
    query(next, result.sql, result.values,(results) => {
        selectAllUser(next, res);
    });
});

// Delete
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    query(next, 'DELETE FROM leave_history WHERE user_id = ?', [id],() => {
        query(next, 'DELETE FROM user WHERE _id = ?', [id], () => {
            selectAllUser(next, res);
        });
    });
});

module.exports = router;