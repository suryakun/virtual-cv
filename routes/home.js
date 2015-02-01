var express = require('express'),
	route = express.Router();

route.get('/', function(request,response){
	response.render('home');
});

module.exports = route;
