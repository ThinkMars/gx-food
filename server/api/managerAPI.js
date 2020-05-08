const express = require("express");
const router = express.Router();
const managerDao = require("../dao/managerDao.js");

/* 用户 */

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
    let params = [pageNum, pageSize] = [(req.query.pageNum * 1 - 1) * req.query.pageSize * 1, req.query.pageSize * 1];
    // console.log(req.query)
    managerDao.queryUserByPage(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})

router.post("/delMultiUserById", (req, res, next) => {
    let params = req.body.id;
    console.log(params)
    managerDao.deleteMultiUserById(params, (result) => {
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

// 通过标题查找故事
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
// 翻页查找故事
router.get('/getStoryByPage', (req, res, next) => {
    // 翻页注意事项
    let params = [pageNum, pageSize] = [(req.query.pageNum * 1 - 1) * req.query.pageSize * 1, req.query.pageSize * 1];
    // console.log(req.query)
    managerDao.queryStoryByPage(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
// 故事数量
router.get("/getCountStory", (req, res, next) => {
    managerDao.queryCountStory((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
// 添加故事
router.post("/addStory", (req, res, next) => {
    let params = [title, createdtime, abstract, content] = [req.body.title, req.body.time, req.body.abstract, req.body.content]
    managerDao.insertStory(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "添加失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '添加成功', data: null });
        } 
    })
})
// 通过Id删除故事
router.post("/delMultiStoryById", (req, res, next) => {
    let params = req.body.id;
    managerDao.deleteMultiStoryById(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
})
router.post("/alertStory", (req, res, next) => {
    let params = [title, createdTime, abstract, content] = [req.body.title, req.body.time, req.body.abstract, req.body.content]
    managerDao.AlertStory(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "修改失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '修改成功', data: null });
        }
    })
})


/* 评论 */

// 评论数
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

router.post("/delMultiCommentById", (req, res, next) => {
    let params = req.body.id;
    console.log(params)
    managerDao.deleteMultiCommentById(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
})
router.get('/getCommentByPage', (req, res, next) => {
    // 翻页注意事项
    let params = [pageNum, pageSize] = [(req.query.pageNum * 1 - 1) * req.query.pageSize * 1, req.query.pageSize * 1];
    // console.log(req.query)
    managerDao.queryCommentByPage(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCommentByName", (req, res, next) => {
    let params = [uname] = [req.query.uname];
    managerDao.queryCommentByName(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCommentByTime", (req, res, next) => {
    let params = [startTime, endTime] = [req.query.startTime, req.query.endTime];
    managerDao.queryCommentByTime(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getCommentByNameAndTime", (req, res, next) => {
    let params = [uname, startTime, endTime] = [req.query.uname, req.query.startTime, req.query.endTime];
    managerDao.queryCommentByNameAndTime(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})

/* 美食区 */

router.get("/getCountFoods", (req, res, next) => {
    managerDao.queryCountFoods((result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
router.get("/getAllFoodsByPage", (req, res, next) => {
    // 翻页
    let params = [pageNum, pageSize] = [(req.query.pageNum * 1 - 1) * req.query.pageSize * 1, req.query.pageSize * 1];
    managerDao.queryAllFoods(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
// 检索美食通过名称
router.get("/getFoodByName", (req, res, next) => {
    let params = [fname] = [req.query.fname];
    console.log(params)
    managerDao.queryFoodByName(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "查询失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '查询成功', data: result });
        }
    })
})
// 添加食物
router.post("/addFood", (req, res, next) => {
    let params = [fname, img, detatils, s_id, city] = [req.body.fname, req.body.img, req.body.details, req.body.s_id, req.body.city];
    // console.log(params);
    managerDao.insertFood(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "添加失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '添加成功', data: null });
        }
    })
})
// 通过Id删除食物
router.post("/delMultiFoodById", (req, res, next) => {
    let params = req.body.id;
    // console.log(params)
    managerDao.deleteMultiFoodById(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "删除失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '删除成功', data: null });
        }
    })
})
// 修改美食
router.post("/alertFood", (req, res, next) => {
    let params = [fname, img, details, s_id, city] = [req.body.fname, req.body.img, req.body.details, req.body.s_id, req.body.city];
    managerDao.AlertFood(params, (result) => {
        if (result == null || result.length == 0) {
            res.json({ status: 'error', msg: "修改失败" });
        } else {
            res.status(200).json({ status: 'success', msg: '修改成功', data: null });
        }
    })
})


module.exports = router;