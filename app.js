require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/roomsRoutes');
var app = express();


///////////////////////////////////////////////
var cookieParser = require('cookie-parser');
                
app.use(cookieParser('VERY SECRET SECRET'));
/////////////////////////////////////////////////



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('VERY SECRET SECRET'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

module.exports = app;

