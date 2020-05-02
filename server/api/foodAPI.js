const express = require('express');
const router = express.Router();
const foodDao = require('../dao/foodDao');
const async = require('async');
const request = require("request");

// 加载所有美食
router.get('/getTotalFoods', (req, res, next) => {
    foodDao.queryTotalFoods((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
});

// 加载美食，限制数量
router.get('/getFoods', (req, res, next) => {
    let params = [num] = [parseInt(req.query.num)];
    foodDao.queryFood(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
});

// 加载美食，轮播图用
router.get('/getLunbotu', (req, res, next) => {
    foodDao.queryFoodsByDetails((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})

// 检索美食，按城市分类// for循环需要解决异步问题，node执行时会重新开启一个进程处理下面的函数
router.post('/getFoodsByCity', (req, res, next) => {
    // 获取城市集
    const cityGroup = req.body.city;
    foodDao.queryTotalFoods((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            const cityTotal = {};
            let newRes = JSON.parse(JSON.stringify(result));
            // 通过城市进行分类汇总。类似"nanjing":{[]}
            for (let i = 0; i < cityGroup.length; i++) {
                cityTotal[cityGroup[i]] = [];
                for (let j = 0; j < newRes.length; j++) {
                    if (newRes[j].City == cityGroup[i]) {
                        cityTotal[cityGroup[i]].push(newRes[j]);
                    }
                }
            };
            res.status(200).json({ status: 'success', msg: '查询成功', data: cityTotal });
        }
    });

});

// 加载美食详情
router.get('/getFoodDetail', (req, res, next) => {
    let id = req.query.id;
    const options = {
        method: 'GET',
        url: 'https://way.jd.com/jisuapi/detail',
        qs:
        {
            id: id,
            appkey: '1d5b6011908168f74182bb5e410b36a6'
        }
    };

    request(options, (error, response, body) => {
        if (error) throw new Error(error);
        res.send(body);
    });
});

// 添加美食
router.post('/addFood', (req, res, next) => {
    let params = [fname, img, details] = [req.query.fname, req.query.img, req.query.details];
    foodDao.insertFood(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "添加美食失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '添加美食成功', data: null });
        }
    })
});

// 删除美食
router.post('/removeFood', (req, res, next) => {
    let params = [id] = [req.query.id];
    foodDao.deleteFood(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
});

// 修改美食
router.post('/alertFood', (req, res, next) => {
    let params = [fname, img, details] = [req.query.fname, req.query.img, req.query.details];
    foodDao.alertFood(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "修改美食失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '修改美食成功', data: null });
        }
    })
});

module.exports = router;