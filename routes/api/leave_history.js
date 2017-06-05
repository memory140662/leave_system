var router = require('express').Router();
var query = require('../../lib/db_connection').query;
var utils = require('../../lib/utils');

function selectAllHisByUserId(userId, res, next) {
    let sql =  ' SELECT his._id, his.date_fr, his.date_to, typ.name, his.hours, his.his_allow FROM leave_history his ';
        sql += ' LEFT JOIN leave_type typ';
        sql += ' ON his.type_id = typ._id';
        sql += ' WHERE his.user_id = ?';
        sql += ' ORDER BY his._id DESC';
        query(next, sql, [userId], (results) => {
            res.end(JSON.stringify(results));
        });
}

function selectHisByAllow(res, next, allow) {
    let sql =  ' SELECT his._id, his.date_fr, his.date_to, typ.name, his.hours, user.username, his.his_allow FROM leave_history his ';
        sql += ' LEFT JOIN leave_type typ';
        sql += ' ON his.type_id = typ._id';
        sql += ' LEFT JOIN user ';
        sql += ' ON his.user_id = user._id ';
        sql += ' WHERE his.his_allow = ?'
        sql += ' ORDER BY his._id DESC';
        query(next, sql, [allow], (results) => {
            res.end(JSON.stringify(results));
        });
}

router.get('/:user_id', (req, res, next) => {
    let userId = req.params.user_id;
    selectAllHisByUserId(userId, res, next);
});

router.get('/', (req, res, next) => {
    selectHisByAllow (res, next, 'N');
});

router.post('/', (req, res, next) => {
    let history = req.body;
    let sql = 'INSERT INTO leave_history SET ?';
    query(next, sql, history, () => {
        selectAllHisByUserId(history.userId, res, next);
    });
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let history = req.body;
    let result = utils.composeUpdateSql(history, 'leave_history');
    if (!!id) {
        result.values.push(id);
        query(next, result.sql, result.values, () => {
            selectAllHisByUserId(history.user_id, res, next);
        });
    }
    selectAllHisByUserId(history.user_id, res, next);
});

router.put('/allow/:option', (req, res, next) => {
    let option = req.params.option;
    let histories = req.body;
    let ids = [];
    let i = '';
    for (var key in histories) {
        i += (!!i) ? ', ?' : '?';
        ids.push(histories[key]._id);
    }
    let sql = 'UPDATE leave_history SET his_allow = "' + option + '" ';
        sql += 'WHERE _id IN (' + i + ')';
    
    if (ids.length == 0) {
        selectHisByAllow (res, next, 'N');
    }
    query(next, sql , ids, () => {
        selectHisByAllow (res, next, 'N');
    });
});

router.delete('/:user_id/:id', (req, res, next) => {
    let userId = req.params.user_id;
    let historyId = req.params.id;
    query(next, 'DELETE leave_type WHERE _id = ?', [historyId], () => {
        selectAllHisByUserId(userId, res, next);
    });

});

module.exports = router;