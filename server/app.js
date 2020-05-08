const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redisClient = require("./utils/redisUtil").redisClient(); // redis服务器




const indexRouter = require('./routes/index');
const userAPI = require('./api/userAPI');
const foodAPI = require('./api/foodAPI');
const storyAPI = require('./api/storyAPI');
const commentAPI = require('./api/commentAPI');
const managerAPI = require('./api/managerAPI');
const fileAPI = require("./api/fileAPI");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8090');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

// 跨域
// const cors = require('cors');
// app.use(cors({
//   origin: ['http://localhost:8090'],  //指定接收的地址
//   methods: ['GET', 'POST'],  //指定接收的请求类型
// }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser("thinkmars_secret"));

// session-cookie
app.use(session({
  name: "session-name",
  secret: "thinkmars_secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000, httpOnly: true },
  store: new redisStore({
    client: redisClient
  })
}));

app.use('/', indexRouter);
app.use('/user', userAPI);
app.use('/food', foodAPI);
app.use('/story', storyAPI);
app.use('/comment', commentAPI);
app.use('/manager', managerAPI);
app.use('/file', fileAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
