var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.all('/:sendkey.send', function(req, res, next) {

  // 鉴定权限
  const sendkey = req.params.sendkey;

  var orm = require('../lib/MysqlORM');
  res.json("send key" + req.params.sendkey);
});
module.exports = router;
