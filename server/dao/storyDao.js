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
    let deleteSql = 'delete from article where id=?;';
    connection.query(deleteSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 按数量查找故事
function queryStoryLimit(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from article order by id desc limit ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};
// 查找故事标题
function queryStoryTitle(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select id, title, createdTime from article order by id desc limit ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
// 按id查找故事
function queryStoryById(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select title, content from article where id=?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

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

module.exports.queryStoryLimit = queryStoryLimit;
module.exports.queryStoryTitle = queryStoryTitle;
module.exports.queryStoryById = queryStoryById;
module.exports.insertStory = insertStory;
module.exports.deleteStory = deleteStory;
module.exports.alertStory = alertStory;
