var express = require('express'),
	User = require('../models/usermodel'),
	url = require('url'),
	fs = require('fs'),
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
	var result = req.body.template;
	var email = req.body.email;
	var html,cv,header;	
	var css = fs.readFileSync('./public/templates/testing/css/style.css','utf8');

	User.findOne({'email': email}, function(error,user){
		if (error) console.log(error);
		user.cv = result;
		user.header = header;
		user.save(function(err){
			if (err) console.log(err);
			cv = DOMBuilder.build(user.cv, 'html').toString();
			// header = DOMBuilder.build(user.header, 'html').toString();
			header = '<head><style>' + css + '</style></head>'
			cv = '<body>' + cv + '</body>';		
			cv = header + cv;
			cv = '<html>' + cv + '</html>';		
			cv = cv.toString();
			// res.send(cv.substring(1,30));
			pdf.create(cv,options).toFile(function(error,file){
				if (error) console.log(error);
				res.sendFile(file.filename);
				// console.log(file);
			});			
		});

	});
});

module.exports = router;