const express = require('express');
const router = express.Router();
const foodDao = require('../dao/foodDao');

// 加载美食
router.get('/getFoods', (req, res, next) => {
    let params = [num] = [req.query.num];
    foodDao.queryFood(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "加载失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});

// 添加美食
router.post('/addFood', (req, res, next) => {
    let params = [fname, img, details] = [req.query.fname, req.query.img, req.query.details];
    foodDao.insertFood(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "添加美食失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '添加美食成功', data: null });
        }
    })
});

// 删除美食
router.post('/removeFood', (req, res, next) => {
    let params = [id] = [req.query.id];
    foodDao.deleteFood(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "删除失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
});

// 修改美食
router.post('/alertFood', (req, res, next) => {
    let params = [fname, img, details] = [req.query.fname, req.query.img, req.query.details];
    foodDao.alertFood(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "修改美食失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '修改美食成功', data: null });
        }
    })
});

module.exports = router;