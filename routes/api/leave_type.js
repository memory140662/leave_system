var router = require('express').Router();
var query = require('../../lib/db_connection').query;
var utils = require('../../lib/utils');

function selectAll(next, res) {
    query(next, 'SELECT * FROM leave_type', {}, (results, fields) => {
        res.end(JSON.stringify(results));
    });
}

router.get('/', (req, res, next) => {
    selectAll(next, res);
});

router.post('/', (req, res, next) => {
    var type = req.body;
    query(next, 'INSERT INTO leave_type SET ? ', type, () => {
        selectAll(next, res);
    }); 
    
});

router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let type = req.body;
    let result = utils.composeUpdateSql(type, 'leave_type');
    result.values.push(id);
    query(next, result.sql, result.values, () => {
        selectAll(next, res);
    }); 
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    query(next, 'DELETE FROM leave_type WHERE _id = ? ', [id], () => {
        selectAll(next, res);
    });
});

module.exports = router;