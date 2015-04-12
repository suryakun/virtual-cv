var express = require('express'),
	User = require('../models/usermodel'),
	url = require('url'),
	router = express.Router();	

router.get('/',function(req,res){
	res.render('editable-template');
});

router.post('/store', function(req,res){
	var result = req.body.template;
	console.log(result)
	User.findOne({email : req.body.email }, function(err, data){
		if (err || !data) {
			console.log('not found');
		};
		data = new User();
		data.cv = result;
		data.save(function(err){
			if (err) console.log(err);
			console.log("cv saved");
			res.header(200);
			res.json({id : data.id});
		});
	});
});

router.post('/cv', function(req, res){
	
});

module.exports = router;