const express = require('express');
const router = express.Router();
const storyDao = require('../dao/storyDao');

// 按数量加载故事
router.get('/getStory', (req, res, next) => {
    let params = [num] = [parseInt(req.query.num)];
    storyDao.queryStory(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "加载失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});
// 文化故事模块
router.get('/getStoryTitle', (req, res, next) => {
    let params = 10;
    storyDao.queryStoryTitle(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "加载失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});
// 按照id 查找故事
router.post('/getStoryById', (req, res, next) => {
    let params = [id] = [parseInt(req.body.id)];
    storyDao.queryStoryById(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "加载失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});

// 添加故事
router.post('/addStory', (req, res, next) => {
    console.log(req.body);
    
    let params = [createdTime, title, abstract, content] = [req.body.createdTime, req.body.title, req.body.abstract, req.body.content];
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
    let params = [id] = [req.body.id];
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
    let params = [title, abstract, content] = [req.body.title, req.body.abstract, req.body.content];
    storyDao.alertStory(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "修改故事失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '修改故事成功', data: null });
        }
    })
});

module.exports = router;