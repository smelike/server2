var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("hello server" + process.env.WX_APPID + process.env.WX_APPSECRET)
  // res.render('index', { title: 'Express' });
});

module.exports = router;
