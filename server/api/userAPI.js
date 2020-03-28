const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

// 登录
router.post('/login', (req, res, next) => {
    let params = [uname, upass] = [req.body.uname, req.body.upass];
    userDao.checkLogin(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: '登录名或密码错误' });
        } else {
            res.status(200).json({ status: 'success', msg: '登录成功', data: result });
        }
    })
});

// 注册
router.post('/register', (req, res, next) => {
    let params = [uname, upass, email] = [req.body.uname, req.body.upass, req.body.email];
    userDao.queryUser([req.body.uname], (result) => {
        if (result == null || result.length == 0) {
            userDao.register(params, (results) => {
                res.status(200).json({ status: 'success', msg: '注册成功', data: null });
            })
        } else {
            res.json({ status: 'error', msg: '注册失败，用户名已存在' });
        }
    })
});
module.exports = router;