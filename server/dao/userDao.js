const dbutil = require('../utils/DButil');

// 登录
function checkLogin(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select uname, auth_num from account where uname=? and upass=md5(?);'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 注册
function register(params, success) {
    const connection = dbutil.createConnection();
    let insertSql = 'insert into account(uname, upass, email, auth_num) values(?, md5(?), ?, ?);'
    connection.query(insertSql, params, (error, results)=> {
        if (error) throw error;
        success(results);
    });
    connection.end();
};
function queryUser(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select id from account where uname = ?'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
}

module.exports.checkLogin = checkLogin;
module.exports.register = register;
module.exports.queryUser = queryUser;