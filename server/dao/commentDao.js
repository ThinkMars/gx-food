const dbutil = require('../utils/DButil');

// 添加评论
function insertComment(params, success) {
    const connection = dbutil.createConnection();
    let insertSql = 'insert into comment(type, uname, time, content) values(?, ?, ?, ?);'
    connection.query(insertSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 删除评论  美食：0；故事：1
function deleteComment(params, success) {
    const connection = dbutil.createConnection();
    let deleteSql = 'delete from comment where id=? and type=?;'
    connection.query(deleteSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 查询评论
function queryComment(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from comment where type=? order by id desc limit ?;'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};
// 查询评论总数
function queryTotalNum(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select count(id) as total from comment where type=?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end();
};
// 分页查询
function queryCommentByPage(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select * from comment where type=? order by id desc limit ?, ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.deleteComment = deleteComment;
module.exports.queryComment = queryComment;
module.exports.queryTotalNum = queryTotalNum;
module.exports.queryCommentByPage = queryCommentByPage;