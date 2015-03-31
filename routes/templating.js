var express = require('express'),
	router = express.Router(),
	parser = require('jsonml').parse;

var Stringify = require("jsonml-stringify/stringify");
var stringify = Stringify([
    require("jsonml-stringify/plugins/loose")
]);

router.get('/',function(req,res){
	res.render('editable-template');
});

router.post('/store', function(req,res){
	var result = parser(req.body.template);

	var html = stringify(result);
	console.log(result);
	console.log(html);
	res.json({status: 'ok'});
});

module.exports = router;