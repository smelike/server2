var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  var charactersLength = characters.length;
  for (var i=0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post('/self', async function(req, res, next) {
  res.json(req.session);
});

router.post('/makekey', async function(req, res, next) {
  console.log(req.session);
  const new_key = 'SC2' + req.session.id + 'T' + makeid(10);
  const orm = require('../lib/MysqlORM');
  let user = await orm.models.User.update( {"sendkey": new_key}, {"where":{"openid": req.session.openid}});
  
  const new_user = await orm.models.User.findOne( {"where": {"openid":req.session.openid}} );
  
  res.json(new_user);
});

module.exports = router;
