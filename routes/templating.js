var express = require('express'),
	User = require('../models/usermodel'),
	url = require('url'),
	router = express.Router();	

var DOMBuilder = require('DOMBuilder');
var pdf = require('html-pdf');
var options = {
	filename :'./cv.pdf',
	format: 'letter',
	orientation: 'portlait',	
}	

router.get('/',function(req,res){
	res.render('editable-template');
});

router.post('/store', function(req,res){
	var header = req.body.header;
	var result = req.body.template;
	var email = req.body.email;
	var html,cv;	

	User.findOne({'email': email}, function(error,user){
		if (error) console.log(error);
		user.cv = result;
		user.header = header;
		user.save(function(err){
			if (err) console.log(err);
			cv = DOMBuilder.build(user.cv, 'html').toString();
			header = DOMBuilder.build(user.header, 'html').toString();
			cv = '<body>' + cv + '</body>';		
			cv = header + cv;
			res.send(cv);
			pdf.create(cv,options).toFile(function(error,file){
				if (error) console.log(error);
				res.sendFile(file);
			});			
		});

	});
});

module.exports = router;