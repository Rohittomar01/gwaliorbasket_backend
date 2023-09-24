var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stateCityRouter = require("./routes/statecity");
var companyRouter = require('./routes/company');
var categoryRouter = require("./routes/category");
var ProductRouter = require("./routes/product");
var listProductRouter = require('./routes/ListProduct');
var adminRouter = require('./routes/admin');
var bannerRouter = require('./routes/BannerUpload');
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity', stateCityRouter);
app.use('/company', companyRouter);
app.use('/category', categoryRouter);
app.use('/product', ProductRouter)
app.use('/listproduct', listProductRouter)
app.use('/admin', adminRouter)
app.use('/banner', bannerRouter)





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
