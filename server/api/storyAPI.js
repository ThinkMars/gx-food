const express = require('express');
const router = express.Router();
const storyDao = require('../dao/storyDao');

// 加载故事
router.get('/getStory', (req, res, next) => {
    let params = [num] = [req.query.num];
    storyDao.queryStory(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "加载失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});

// 添加故事
router.post('/addStory', (req, res, next) => {
    let params = [createdTime, title, abstract, content] = [req.query.createdTime, req.query.title, req.query.abstract, req.query.content];
    storyDao.insertStory(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "添加故事失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '添加故事成功', data: null });
        }
    })
});

// 删除故事
router.post('/removeStory', (req, res, next) => {
    let params = [id] = [req.query.id];
    storyDao.deleteStory(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "删除失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
});

// 修改故事
router.post('/alertStory', (req, res, next) => {
    let params = [title, abstract, content] = [req.query.title, req.query.abstract, req.query.content];
    storyDao.alertStory(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "修改故事失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '修改故事成功', data: null });
        }
    })
});

module.exports = router;