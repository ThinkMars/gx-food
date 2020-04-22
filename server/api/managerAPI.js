const express = require("express");
const router = express.Router();
const managerDao = require("../dao/managerDao.js");

/* 用户 */

router.get("/getAllUser", (req, res, next) => {
    // console.log(req)
    managerDao.queryAllUser((result) =>{
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCountUser", (req, res, next) => {
    managerDao.queryCountUser((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getUserByName", (req, res, next) => {
    let params = [uname] = [req.query.uname];
    console.log(params)
    managerDao.queryUserByName(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get('/getUserByPage', (req, res, next) => {
    // 翻页注意事项
    let params = [type, pageNum, pageSize]=[(req.query.pageNum*1-1)*req.query.pageSize*1, req.query.pageSize*1];
    console.log(req.query)
    managerDao.queryUserByPage(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.post("/delUserById", (req, res, next) => {
    let params = req.body.id*1;
    managerDao.deleteUserById(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
})
router.post("/alertUser", (req, res, next) => {
    let params = [uname, email] = [req.body.uname, req.body.email];
    managerDao.AlertUser(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "修改失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '修改成功', data: null });
        }
    })
})


/* 故事 */
router.get("/getAllStory", (req, res, next) => {
    managerDao.queryAllStory((result) =>{
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCountStory", (req, res, next) => {
    managerDao.queryCountArticle((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询', data: result });
        }
    })
})
router.get("/getStoryByTitle", (req, res, next) => {
    let params = [title] = [req.query.title];
    managerDao.queryStoryByTitle(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.post("/delUserById", (req, res, next) => {
    let params = [id] = [req.body.id*1];
    managerDao.deleteUserById(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
})


/* 评论 */
router.get("/getAllComment", (req, res, next) => {
    managerDao.queryAllComment((result) =>{
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCountComment", (req, res, next) => {
    managerDao.queryCountComment((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCommentByTitle", (req, res, next) => {
    let params = [title] = [req.query.title];
    managerDao.queryStoryByTitle(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.post("/delCommentById", (req, res, next) => {
    let params = [id] = [req.body.id*1];
    managerDao.deleteCommentyById(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
})

module.exports = router;