const express = require('express');
const router = express.Router();
const commentDao = require('../dao/commentDao');

// 加载评论， 食物：0， 故事：1
router.get('/getComments', (req, res, next) => {
    let params = [type, num] = [req.query.type, req.query.num];
    commentDao.queryComment(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "加载失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});
// 添加评论
router.post('/addComment', (req, res, next) => {
    let params = [type, uname, time, content] = [req.query.type, req.query.uname, req.query.time, req.query.content];
    commentDao.insertComment(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "评论失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '评论成功', data: null });
        }
    })
});

// 删除评论  美食：0；故事：1
router.post('/removeComment', (req, res, next) => {
    let params = [type, id] = [req.query.type, req.query.id];
    commentDao.deleteComment(params, (result) => {
        if(result == null || result.length == 0) {
            res.json({status: 'error', msg: "删除失败"});
        }else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
});

module.exports = router;