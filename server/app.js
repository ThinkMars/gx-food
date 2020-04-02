const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const userRouter = require('./api/userAPI');
const foodRouter = require('./api/foodAPI');
const storyRouter = require('./api/storyAPI');
const commentRouter = require('./api/commentAPI');

const app = express();

// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8090/index/storyDetail');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

// 跨域
const cors = require('cors');
app.use(cors({
  origin:['http://localhost:8090'],  //指定接收的地址
  methods:['GET','POST'],  //指定接收的请求类型
}));
// app.options("*", cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/user', userRouter);
app.use('/food', foodRouter);
app.use('/story', storyRouter);
app.use('/comment', commentRouter);

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

module.exports = app;
