const express = require("express");
const router = express.Router();
const multiparty = require("multiparty");
const fs = require("fs");

// 上传图片后存在public/images文件夹里，并返回一个文件访问路径
router.post("/uploadImg", (req, res, next) => {
    let options = {
        encoding: "utf-8",
        autoFiles: true,
        uploadDir: "./public/images"
    }
    // 处理formdata流
    let form = new multiparty.Form(options);

    form.parse(req, (err, fields, files) => {
        let result = null;
        let uploadPath = files.file[0].path;
        let originalFilename = "public/images/" + files.file[0].originalFilename;
        // 如果不为空：说明用户上传了图片
        if (originalFilename) {
            fs.rename(uploadPath, originalFilename, (error) => {
                if (error) {
                    console.log("rename error", error)
                } else {
                    result = {
                        img: "http://localhost:3000" + originalFilename.replace(/public/, "")
                    }
                    res.status(200).json({ status: 'success', msg: '上传成功', data: result });
                }
            })
        } else {
            //即使没有上传图片。系统会自动上传一个无效文件，因此删除
            fs.unlink(uploadPath, () => { })
        }
    });
    form.on("close", () => {
    });

    form.on("error", (err) => {
        res.json({ status: 'error', msg: "上传失败" });
    });
})

module.exports = router;