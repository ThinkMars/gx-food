const express = require('express');
const router = express.Router();
const commentDao = require('../dao/commentDao');

// 加载评论， 食物：0， 故事：1
router.get('/getComments', (req, res, next) => {
    let params = [type, num] = [req.query.type, parseInt(req.query.num)];
    commentDao.queryComment(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
});
// 加载评论数
router.get('/getCommentsNum', (req, res, next) => {
    let params = [type] = [req.query.type];
    commentDao.queryTotalNum(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "加载失败" });
        } else {
            // console.log(req.session);
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    });
});
// 按页数加载评论
router.get('/getCommentByPage', (req, res, next) => {
    let params = [type, pageNum, pageSize] = [req.query.type, (req.query.pageNum*1) * req.query.pageSize * 1, req.query.pageSize * 1];
    commentDao.queryCommentByPage(params, (result) => {
        if (result == null) {
            res.json({ status: 'error', msg: "加载失败" });
        } else if (result.length == 0) {
            res.status(200).json({ status: 'warning', msg: '没有更多了', data: null });
        } else {
            res.status(200).json({ status: 'success', msg: '加载成功', data: result });
        }
    })
})

// 添加评论
router.post('/addComment', (req, res, next) => {
    if (req.session.userInfo) {
        let params = [type, uname, time, content] = [req.body.Type, req.body.Uname, req.body.Time, req.body.Content];
        commentDao.insertComment(params, (result) => {
            if (result == null || result.length == 0) {
                res.json({ status: 'error', msg: "评论失败" });
            } else {
                res.status(200).json({ status: 'success', msg: '评论成功', data: null });
            }
        })
    }else {
        res.json({ status: 'error', msg: "评论失败，用户未登录或身份已经过期" });
    }
});

// 删除评论  美食：0；故事：1
router.post('/removeComment', (req, res, next) => {
    let params = [type, id] = [req.query.type, req.query.id];
    commentDao.deleteComment(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
});

module.exports = router;