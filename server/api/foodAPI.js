const express = require('express');
const router = express.Router();
const foodDao = require('../dao/foodDao');
const async = require('async');

// 加载所有美食
router.get('/getTotalFoods', (req, res, next) => {
    foodDao.queryTotalFoods((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
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
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});

// 检索美食，按城市分类// for循环需要解决异步问题，node执行时会重新开启一个进程处理下面的函数
router.post('/getFoodsByCity', (req, res, next) => {
    // const cityTotal = [];
    // const cityGroup = req.body.city;
    // for(let i = 0; i < cityGroup.length; i++) {
    //     let params = cityGroup[i];
    //     foodDao.queryTotalFoodsByCity(params, (result) => {
    //         cityTotal.push(JSON.stringify(result));
    //     });
    // };
    // console.log(cityTotal);

    const cityGroup = req.body.city;
    foodDao.queryTotalFoods((result) => {
        // const cityTotal = {
        //     "南宁市":[],
        //     "桂林市":[],
        //     "梧州市":[],
        //     "北海市":[],
        //     "柳州市":[]
        // };
        const cityTotal = {};
        let newRes = JSON.parse(JSON.stringify(result));
        // console.log(cityGroup.length);
        // console.log(newRes.length);
        // console.log(newRes[0].City);
        // console.log(cityGroup[0]);
        for(let i = 0; i < cityGroup.length; i++) {
            cityTotal[cityGroup[i]] = [];
            for(let j = 0; j < newRes.length; j++) {
                if(newRes[j].City == cityGroup[i]) {
                    cityTotal[cityGroup[i]].unshift(newRes[j]);
                }
            }
        };
        res.status(200).json({ status: 'success', msg: '查询成功', data: cityTotal });
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