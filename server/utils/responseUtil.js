function writeResult(result, resMsg) {
    if(result == null || result.length == 0) {
        res.json({status: 'error', msg: msg});
    }else {
        res.json({ status: 'success', msg: resMsg, data: result });
    }
}

module.exports.writeResult = writeResult;