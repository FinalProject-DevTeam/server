require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const customerRouter = require('./routes/firebasecustomer');
const authRouter = require('./routes/firebaseauth');
const transactionRouter = require('./routes/firebasetransaction');
const EmailPromo = require('./routes/emailpromo')
const SMSPromo = require('./routes/smspromo')
const awsRouter = require('./routes/aws');
const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/authentication', authRouter);
app.use('/transaction', transactionRouter);
app.use('/emailpromo', EmailPromo)
app.use('/smspromo', SMSPromo)
app.use('/aws', awsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
