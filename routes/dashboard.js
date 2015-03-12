var express = require('express'),
	route = express.Router();

route.get('/', function(request,response){
	response.render('dashboard');
});

module.exports = route;
