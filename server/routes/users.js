var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/name', function(req, res, next) {
  res.send('response with name')
});

module.exports = router;
