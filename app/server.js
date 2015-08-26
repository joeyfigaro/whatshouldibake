var fs = require('fs');
var express = require('express');
// var mongoose = require('mongoose');
// var passport = require('passport');
// var config = require('config');
var app = express();
var port = process.env.PORT || 3000;
// var session = require('express-session');
// var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var csrf = require('csurf');
var jade = require('jade');
// var mongoStore = require('connect-mongo')(session);
// var flash = require('connect-flash');
// var winston = require('winston');
var helpers = require('view-helpers');
var pkg = require('../package.json');
var env = process.env.NODE_ENV || 'development';

// Connect to mongodb
// var connect = function () {
//   var options = { server: { socketOptions: { keepAlive: 1 } } };
//   mongoose.connect(config.db, options);
// };
// connect();
//
// mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

// Bootstrap models
// fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
//   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
// });

// Bootstrap passport config
// require('./config/passport')(passport, config);


// // Compression middleware (should be placed before express.static)
// app.use(compression({
// threshold: 512
// }));

// Static files middleware
app.use(express.static('./public'));

// Use winston on production
// var log;
// if (env !== 'development') {
// log = {
//   stream: {
//     write: function (message, encoding) {
//       winston.info(message);
//     }
//   }
// };
// } else {
// log = 'dev';
// }

// Don't log during tests
// Logging middleware
// if (env !== 'test') app.use(morgan(log));

// set views path, template engine and default layout
// app.engine('html', jade);
app.set('views', './views');
app.set('view engine', 'jade');

// expose package.json to views
app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
});

// bodyParser should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// cookieParser should be above session
// app.use(cookieParser());
// app.use(cookieSession({ secret: process.env.WSIB_COOKIE_SESSION_SECRET }));
// app.use(session({
//     secret: pkg.name,
//     proxy: true,
//     resave: true,
//     saveUninitialized: true,
//     store: new mongoStore({
//         url: process.env.WSIB_DEV_DB,
//         collection : 'sessions'
//     })
// }));

// use passport session
// app.use(passport.initialize());
// app.use(passport.session());

// connect flash for flash messages - should be declared after sessions
// app.use(flash());

// should be declared after session and flash
app.use(helpers(pkg.name));

// adds CSRF support
// if (process.env.NODE_ENV !== 'test') {
//     app.use(csrf());
//
//     app.use(function(req, res, next) {
//         res.locals.csrf_token = req.csrfToken();
//         next();
//     });
// }


// Bootstrap routes
// require('./config/routes')(app, passport);
// require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);
