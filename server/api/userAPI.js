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
            if (!req.session.userInfo || !req.cookies.userInfo) {
                req.session.userInfo = req.body.uname;
                res.cookie('userInfo', req.body.uname, { maxAge: 10 * 60 * 1000, singed: true });
            }
            res.status(200).json({ status: 'success', msg: '登录成功', data: result });
        }
    })
});

// 注册
router.post('/register', (req, res, next) => {
    let params = [uname, upass, email, Auth_num] = [req.body.uname, req.body.upass, req.body.email, req.body.auth_num];
    userDao.queryUser([req.body.uname], (result) => {
        if (result == null || result.length == 0) {
            userDao.register(params, (results) => {
                req.session.userInfo = req.body.uname;
                res.cookie('userInfo', req.body.uname, { maxAge: 10 * 60 * 1000, singed: true });
                userDao.checkLogin([req.body.uname, req.body.upass], (data) => {
                    if (data == null || data.length == 0) {
                        res.json({ status: 'error' });
                    }else {
                        res.status(200).json({ status: 'success', msg: '注册成功', data: data });
                    }
                })
            })
        } else {
            res.json({ status: 'error', msg: '注册失败，用户名已存在' });
        }
    })
});
module.exports = router;