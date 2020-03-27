function writeResult(result, msg, data) {
    // return JSON.stringify({status: status, msg: msg, data: data});
    if(result == null || result.length == 0) {
        res.json({status: 'error', msg: '注册失败，请重试'});
    }else {
        res.status(200).json({ status: 'success', msg: '注册成功', data: null });
    }
}

module.exports.writeResult = writeResult;