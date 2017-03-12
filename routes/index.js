var express = require('express');

var authentication = require('../controllers/authentication');
var config = require('../config');

var router = express.Router();

router.get('/', function(req, res, next){
	res.render('index.html');
});

router.post('/signup', authentication.signup);

module.exports = router;
