var express = require('express'),
	router = express.Router(),
	parser = require('jsonml').parse;


router.get('/',function(req,res){
	res.render('editable-template');
});

router.post('/store', function(req,res){
	var result = parser(req.body.template);
	console.log(result);
	res.json({status: 'ok'});
});

module.exports = router;