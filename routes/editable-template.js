var express = require('express'),
	router = express.Router();

router.get('/:template', function(request, response){
	var template = request.params.template;
	response.render();
});