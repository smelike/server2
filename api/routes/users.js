var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/self', async function(req, res, next) {
  res.json(req.session);
});
module.exports = router;
