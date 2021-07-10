require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
require('express-async-errors');
var cors = require("cors");
var path = require('path');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var systemRouter = require('./routes/system');
var messageRouter = require('./routes/message');

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var asyncRedis = require('async-redis');
const redis = asyncRedis.createClient({"host":process.env.REDIS_HOST});
app.use(function(req, res, next) {
  req.redis = redis;
  next();
});

app.use('/', indexRouter);
app.use('/', systemRouter);
app.use('/', messageRouter);

async function checkLevel( req, res, next )
{
  const token = req.query.token || req.body.token;
  const raw = await req.redis.get('session/'+token);
  const user_data = JSON.parse(raw);
  if( !user_data || user_data.level < 1 )
  {
    // 权限错误
    throw new Error("错误的 Token 或者用户权限不足 ");
  }
  else
  {
    req.session = user_data;
    next();// 调用路由的下一个流程
  }
}

app.use('/user', checkLevel, userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.env.PORT=8080;
module.exports = app;
