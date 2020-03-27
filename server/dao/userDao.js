const dbutil = require('../utils/DButil');

// 登录
function checkLogin(params, success) {
    const connection = dbutil.createConnection();
    let querySql = 'select id from account where uname=? and upass=md5(?);'
    connection.query(querySql, params, (error, results) => {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

// 注册
function register(params, success) {
    const connection = dbutil.createConnection();
    let insertSql = 'insert into account(uname, upassword, email) values(?, ?, ?);'
    connection.query(insertSql, params, (error, results)=> {
        if (error) throw error;
        success(results);
    });
    connection.end();
};

module.exports.checkLogin = checkLogin;
module.exports.register = register;