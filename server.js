var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');
const morgan = require('morgan');

var config = require('./config.secret.json');
const api = require('./routes/api');

var url = config.DBURL;

//Database setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/StudySpotter');

var index = require('./routes/index');

//Set up port 
var port = process.env.PORT || 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Logging Middleware
app.use(morgan('combined'));

//Set routes
app.use('/api', api);
app.use('/', index);

//Start app
app.listen(port, function(){
	console.log('Server started on port '+port);
});
