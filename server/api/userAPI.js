const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

// 登录
router.post('/login', (req, res, next) => {
    let uname = req.query.uname;
    let upass = req.query.upass;
    let params = [uname, upass];
    userDao.checkLogin(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: '登录名或密码错误'});
        }else {
            res.status(200).json({ status: 'success', msg: '登录成功', data: null });
        }
    })
});

// 注册
router.post('/register', (req, res, next) => {
    let uname = req.query.uname;
    let upass = req.query.upass;
    let params = [uname, upass];
    userDao.register(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: '注册失败，请重试'});
        }else {
            res.status(200).json({ status: 'success', msg: '注册成功', data: null });
        }
    })
});
module.exports = router;