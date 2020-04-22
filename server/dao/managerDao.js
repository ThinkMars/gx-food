const dbutil = require("../utils/DButil");

/* 用户 */
function queryAllUser(success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, uname, email, auth_num from account;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end();
}
function queryCountUser(success) {
    const connection = dbutil.createConnection();
    let querySql = "select count(id) as total from account;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryUserByName(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, uname, email, auth_num from account where uname = ?;"
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function deleteUserByName(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "delete from account where uname = ?;"
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();   
}
function deleteUserById(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "delete from account where id = ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryUserByPage(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select id, uname, email, auth_num from account limit ?, ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end()
}
function AlertUser(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "update account set uname = ?, email = ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

/* 故事 */
function queryAllStory(success) {
    const connection = dbutil.createConnection();
    let querySql = "select title, createdTime, content from article;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryCountArticle(success) {
    const connection = dbutil.createConnection();
    let querySql = "select count(id) as total from artile;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryStoryByTitle(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select title, createdTime, content from article where title = ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryStoryByTime(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select title, createdTime, content from article where createdtime >= ? and createdtime < ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function AlertStory(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "update article set title = ?, content = ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function deleteStoryById(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "delete from article where id = ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}


/* 评论 */
function queryAllComment(success) {
    const connection = dbutil.createConnection();
    let querySql = "select uname, time, content from comment;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryCountComment(success) {
    const connection = dbutil.createConnection();
    let querySql = "select count(id) as total from comment;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryCommentByName(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select uname, time, content from comment where uname = ?;"
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();   
}
function deleteCommentyById(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "delete from comment where id = ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

module.exports.queryAllUser = queryAllUser;
module.exports.queryCountUser = queryCountUser;
module.exports.queryUserByName = queryUserByName;
module.exports.deleteUserByName = deleteUserByName;
module.exports.deleteUserById = deleteUserById;
module.exports.queryUserByPage = queryUserByPage;
module.exports.AlertUser = AlertUser;

module.exports.queryAllStory = queryAllStory;
module.exports.queryCountArticle = queryCountArticle;
module.exports.queryStoryByTitle = queryStoryByTitle;
module.exports.queryStoryByTime = queryStoryByTime;
module.exports.AlertStory = AlertStory;
module.exports.deleteStoryById = deleteStoryById;

module.exports.queryAllComment = queryAllComment;
module.exports.queryCountComment = queryCountComment;
module.exports.deleteCommentyById = deleteCommentyById;
module.exports.queryCommentByName = queryCommentByName;















