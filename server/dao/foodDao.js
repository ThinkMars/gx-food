const dbutil = require('../utils/DButil');

// 添加精选菜谱
function insertFood (params, success) {
    const connection = dbutil.createConnection();
    let insertSql = 'insert into foods(fname, img, details, S_id, city) values(?, ?, ?, ?, ?);'
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

// 限制数量查询精选菜谱
function queryFood(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from foods order by id desc limit ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 查询所有美食信息
function queryTotalFoods(success) {
    // console.log(111);
    const connection = dbutil.createConnection();
    let querySql = 'select * from foods;';
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};
// 按城市查询美食
function queryTotalFoodsByCity(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from foods where city = ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};
// 按照详情查找图片
function queryFoodsByDetails(success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from foods where details = "banner";';
    connection.query(querySql, (error, results) => {
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

module.exports.insertFood = insertFood;
module.exports.deleteFood = deleteFood;
module.exports.queryFood = queryFood;
module.exports.alertFood = alertFood;
module.exports.queryTotalFoods = queryTotalFoods;
module.exports.queryTotalFoodsByCity = queryTotalFoodsByCity;
module.exports.queryFoodsByDetails = queryFoodsByDetails;