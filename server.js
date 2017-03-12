var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');
const morgan = require('morgan');

var config = require('./config.secret.json');

var url = config.DBURL;

//Database setup
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/StudySpotter');

var index = require('./routes/index');

var port = 3000;

var app = express();
app.use(morgan('combined'));

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

app.listen(port, function(){
	console.log('Server started on port '+port);
});
