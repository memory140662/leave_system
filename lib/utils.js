exports.composeUpdateSql = (data, tableName) => {
    var values = [];
    var sql = '';
    for (var key in data) {
        if (key == '_id' || key == 'id') continue;
        sql += ((sql.length > 0) ? ', ' : '') + key + ' = ? ';
        values.push(data[key]);
    }
    sql = 'UPDATE ' + tableName + ' SET ' + sql + ' WHERE _id = ?';
    // values.push(data.id);
    return {
        sql,
        values
    }
}