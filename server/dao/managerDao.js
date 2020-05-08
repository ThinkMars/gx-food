const dbutil = require("../utils/DButil");

/* 用户 */

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
// 删除多条记录
function deleteMultiUserById(params, success) {
    console.log(params)
    const connection = dbutil.createConnection();
    let querySql = `delete from account where id in (${params});`;
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
    let querySql = `update account set uname = ?, email = ? where uname = "${params[0]}";`;
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

/* 故事 */
function queryStoryByTitle(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, title, createdTime, abstract, content from article where title=?;";
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
    console.log(params)
    const connection = dbutil.createConnection();
    let altSql = `update article set title = ?, createdtime=?, abstract=?, content = ? where title = '${params[0]}';`;
    connection.query(altSql, params, (error, results) => {
        if (error) throw error;
        console.log(results)
        success(results);
    });
    connection.end();
}
// 故事数量
function queryCountStory(success) {
    const connection = dbutil.createConnection();
    let querySql = "select count(id) as total from article;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryStoryByPage(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select id, title, createdTime, abstract, content from article limit ?, ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end()
}
function insertStory(params, success) {
    const connection = dbutil.createConnection();
    let insertSql = "insert article(title, createdtime, abstract, content) values(?, ?, ?, ?);";
    connection.query(insertSql, params, (error, results)=> {
        if (error) throw error;
        success(results);
    })
    connection.end();
}
// 删除多条记录
function deleteMultiStoryById(params, success) {
    const connection = dbutil.createConnection();
    let deleteSql = `delete from article where id in (${params});`;
    connection.query(deleteSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}


/* 评论 */

// 评论数
function queryCountComment(success) {
    const connection = dbutil.createConnection();
    let querySql = "select count(id) as total from comment;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

// 删除多条记录
function deleteMultiCommentById(params, success) {
    const connection = dbutil.createConnection();
    let querySql = `delete from comment where id in (${params});`;
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryCommentByPage(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select id, uname, time, content, type from comment limit ?, ?;';
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end()
}
function queryCommentByName(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, uname, time, content, type from comment where uname = ?;"
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryCommentByTime(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, uname, time, content, type from comment where time >= ? and time < ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryCommentByNameAndTime(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, uname, time, content, type from comment where uname=? and time >= ? and time < ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

/* 美食区 */

function queryCountFoods(success) {
    const connection = dbutil.createConnection();
    let querySql = "select count(id) as total from foods;";
    connection.query(querySql, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function queryAllFoods(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, fname, img, city, details, s_id from foods limit ?, ?;";
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end()
}
function queryFoodByName(params, success) {
    const connection = dbutil.createConnection();
    let querySql = "select id, fname, img, city, details, s_id from foods where fname = ?;"
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function insertFood(params, success) {
    const connection = dbutil.createConnection();
    let insertSql = "insert into foods(fname, img, details, S_id, city) values(?, ?, ?, ?, ?);";
    connection.query(insertSql, params, (error, results) => {
        if (error) throw error;
        success(results);
    })
    connection.end()
}
function deleteMultiFoodById(params, success) {
    const connection = dbutil.createConnection();
    let querySql = `delete from foods where id in (${params});`;
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}
function AlertFood(params, success) {
    const connection = dbutil.createConnection();
    let querySql = `update foods set fname = ?, img = ?, details = ?, s_id = ?, city = ? where fname = "${params[0]}";`;
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}


module.exports.queryCountUser = queryCountUser;
module.exports.queryUserByName = queryUserByName;
module.exports.deleteUserByName = deleteUserByName;
module.exports.queryUserByPage = queryUserByPage;
module.exports.AlertUser = AlertUser;
module.exports.deleteMultiUserById = deleteMultiUserById;


module.exports.queryStoryByTitle = queryStoryByTitle;
module.exports.queryStoryByTime = queryStoryByTime;
module.exports.AlertStory = AlertStory;
module.exports.queryStoryByPage = queryStoryByPage;
module.exports.queryCountStory = queryCountStory;
module.exports.insertStory = insertStory;
module.exports.deleteMultiStoryById = deleteMultiStoryById;

module.exports.queryCountComment = queryCountComment;
module.exports.deleteMultiCommentById = deleteMultiCommentById;
module.exports.queryCommentByName = queryCommentByName;
module.exports.queryCommentByPage = queryCommentByPage;
module.exports.queryCommentByTime = queryCommentByTime;
module.exports.queryCommentByNameAndTime = queryCommentByNameAndTime;

module.exports.queryCountFoods = queryCountFoods;
module.exports.queryAllFoods = queryAllFoods;
module.exports.queryFoodByName = queryFoodByName;
module.exports.insertFood = insertFood;
module.exports.deleteMultiFoodById = deleteMultiFoodById;
module.exports.AlertFood = AlertFood;

















