var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//get database config
var database = require('./config/database');


//export all controller
var routes = require('./routes/index'),
    dashboard = require('./routes/dashboard'),
    users = require('./routes/users'),
    home = require('./routes/home'),
    register = require('./routes/register'),
    test = require('./routes/test'),
    upload = require('./routes/upload'),
    api = require('./routes/api'),
    templating = require('./routes/templating');

var app = express();

//load database
mongoose.connect(database.host);
mongoose.connection.on("error", console.error.bind(console,'connection error:'));
mongoose.connection.on("open", function(ref){
    console.log("Connection database success");
});
mongoose.connection.on("close", function(ref){
    console.log("Connection database closed");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/dashboard', dashboard)
app.use('/register', register);
app.use('/users', users);
app.use('/upload', upload);
app.use('/test', test);
app.use('/api', api);
app.use('/templating', templating);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;