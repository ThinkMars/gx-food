const dbutil = require('../utils/DButil');

// 添加精选菜谱
function insertFood (params, success) {
    const connection = dbutil.createConnection();
    let insertSql = 'insert into foods(fname, img, details) values(?, ?, ?);'
    connection.query(insertSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 删除精选菜谱
function deleteFood(params, success) {
    const connection = dbutil.createConnection();
    let deleteSql = 'delete from foods where id=?;'
    connection.query(deleteSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 查询精选菜谱
function queryFood(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from foods order by id desc limit ?;'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 修改精选菜谱
function alertFood(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'update foods set fname=?, img=?, details=?;'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

module.exports.insertFoods = insertFood;
module.exports.deleteFoods = deleteFood;
module.exports.queryFoods = queryFood;
module.exports.alertFoods = alertFood;