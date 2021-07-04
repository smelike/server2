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

/* 获取微信登入的二维码. */

router.get('/qrcode', async function(req, res, next) {
  // res.send('respond with a resource');

  // 生成一个唯一的 session_id
  // 首先通过 uuid 生成一个唯一的 session id 
  const session_id = 'sc2-'+uuid.v1();
  
  // 然后将用户的 level 设置为 0
  const user_info = {"token":session_id,"level":0};
  // 并保存到 redis 中
  await req.redis.set("session/"+session_id , JSON.stringify(user_info));

  // 然后调用微信 api 生成二维码
  const qrdata = await api.createTmpQRCode(session_id,1800);
  qrdata.token = session_id;
  res.json( qrdata );
});

// 接口配置信息 正确响应微信发送的Token验证
/*
router.all('/wechat/callback', async (req, res, next) => {
  
  console.log(req.query);
  res.send(req.query.echostr);
})
*/
router.all('/wechat/callback', Wechat( wechat_config, async (req, res, next) => {

  console.log(req.weixin);
}));
module.exports = router;
