const dbutil = require('../utils/DButil');

// 添加故事
function insertStory (params, success) {
    const connection = dbutil.createConnection();
    let insertSql = 'insert into article (createdTime, title, abstract, content) values(?, ?, ?, ?);'
    connection.query(insertSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 删除故事
function deleteStory(params, success) {
    const connection = dbutil.createConnection();
    let deleteSql = 'delete from article where id=?;'
    connection.query(deleteSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 查找故事
function queryStory(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from article order by id desc limit ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 修改故事
function alertStory(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'update article set title=?, abstract=?, content=?;'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

module.exports.insertStory = insertStory;
module.exports.deleteStory = deleteStory;
module.exports.queryStory = queryStory;
module.exports.alertStory = alertStory;