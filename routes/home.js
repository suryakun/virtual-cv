var express = require('express'),
	route = express.Router();

route.get('/', function(request,response){
	response.render('index');
});

module.exports = route;
