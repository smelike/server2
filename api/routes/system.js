var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

var WechatAPI = require('co-wechat-api');
const api = new WechatAPI(process.env.WX_APPID , process.env.WX_APPSECRET);

var Wechat = require('wechat');
const { route } = require('.');
const wechat_config = {
  token: process.env.WX_TOKEN,
  appid: process.env.WX_APPID,
  encodingAESKey: process.env.WX_AESKEY,
  checkSignature: false
}

/* 监听前端页面请求：获取微信登入的二维码. */
router.get('/qrcode', async function(req, res, next) {
  // 首先通过 uuid 生成一个唯一的 session id 
  const session_id = 'sc2-'+ uuid.v1();

  // 然后将用户的 level 设置为 0
  const user_info = {"token":session_id,"level":0};
  // 并保存到 redis 中
  await req.redis.set("session/"+session_id , JSON.stringify(user_info));
  // 然后调用微信 api 生成二维码
  const qrdata = await api.createTmpQRCode(session_id,1800);
  qrdata.token = session_id;
  res.json( qrdata );
});

//1> 对微信测试帐号的 URL 配置，校验前面之后，返回 echostr
router.get('/wechat/callback', Wechat( wechat_config, async (req, res, next) => {

  // console.log(req.weixin);
  res.send( req.query.echostr );
}));

// 2> 对微信推送的处理路由

router.post( '/wechat/callback' , Wechat( wechat_config , async (req, res, next )=>
{
  // 响应事件
  const message = req.weixin;
  
  if( message.MsgType == 'event' && (message.Event.toLowerCase() == 'scan' || message.Event.toLowerCase() == 'subscribe'  ) )
  {
    const session_id = message.Event.toLowerCase() == 'subscribe' ? message.EventKey.substr(8):message.EventKey;

    const openid = message.FromUserName;
    const user = await api.getUser(openid);
    if( user )
    {
      const orm = require("../lib/MysqlORM");
      const user_info = {"openid":openid,"session_id":session_id,"nickname":user.nickname,"headimgurl":user.headimgurl};
      // console.log(user_info);
      const user_line = await orm.models.User.upsert( user_info);
      // 然后将 user信息放入 redis
      await orm.models.User.sync();
      req.redis.set('session/'+session_id , JSON.stringify(await orm.models.User.findOne({"where":{"id":user_line[0].dataValues.id}})));

      // 发送扫码成功提示
      res.reply("正在登入【思考空气网站】，请回到浏览器点击按钮继续");
    }
    else
    res.reply("出现错误，请稍后再试");
  }
}));

module.exports = router;
