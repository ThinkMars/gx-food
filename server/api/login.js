const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

/* GET home page. */
router.post('/', function(req, res, next) {
    let uname=req.query.uname;
    let upass=req.query.upass;
    let params = [uname, upass];
    userDao.checkLogin(params, (result) => {
        res.status(200).json({status: 'success', msg: '登录成功', data: null})
    })
  });
  
  module.exports = router;