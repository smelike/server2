var express = require('express');
var router = express.Router();
const api = new WechatAPI(process.env.WX_APPID, process.env.WX_APPSECRET);
const orm = require("../lib/MysqlORM");

function makeid(length)
{
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
}
router.all('/:sendkey.send', async function(req, res, next) {

  // 鉴定权限
  const sendkey = req.params.sendkey;
  let title = req.query.title;
  let desp = req.query.desp;
  if (!title || title.length < 1) throw Error("消息标题不能为空");
  title = title.substr(0, 32);

  const user = await orm.models.User.findOne({"where": {"sendkey": sendkey}});
  if (!user || user.level < 1) throw Error("用户不存在或权限不足");

  const readkey = "SC2" + makeid(12);
  const push_data = {"title": title, "desp": desp, "openid": user.openid, "readkey": readkey};

  orm.models.Push.sync();
  const push = await orm.models.Push.create( push_data );
  if (desp) desp = desp.substr(0, 30);

  const url = process.env.WEB_BASE_URL + '/readpush?id=' + push.id +'&readkey='+readkey;
  const templateId = process.env.WX_TPLID;
  const topColor = '#FF0000';
  const data = {
    "title": { value: title},
    "content":{ value: desp}
  };

  const send_type = 'queue'; // direct or queue
  if( send_type == 'direct' )
  {
      const ret = await api.sendTemplate( user.openid , templateId, url , topColor, data );
      console.log( desp );
      res.json(ret);
  }
  else
  {
      const qdata = { "openid":user.openid , templateId, url , topColor, data, "pushid":push.id };
      const ret = await req.redis.publish("scqueue", JSON.stringify( qdata ));
      res.json( {"queue":ret,"readkey":readkey,"pushid":push.id,"at":parseInt(new Date/100)} );
  }
});
module.exports = router;
