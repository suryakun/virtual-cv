var express = require('express'),
	User = require('../models/usermodel'),
	bcrypt = require('bcrypt'),
	nodemailer = require('nodemailer'),
	router = express.Router();

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth ; {
		user: 'surya.ramshere@gmail.com',
		pass: 'sakuragi291106'
	}
});

router.get('/',function(request,respond){
	respond.render('index');
});

router.post('/save_register', function(request,respond){
	var timeNow = new Date();
	var post = request.body;
	var pwd = Math.random().toString(36).slice(2);

	var user = new User({
		fullname: post.bio.fullname,
		email : post.bio.email,
		gender : post.bio.gender,
		username : post.bio.username,
		password : pwd,
		token_password : post.bio.email + '_' + timeNow.toLocaleDateString(),
		token_reset : post.bio.username + '_' + timeNow.toLocaleDateString(),
		phone : null,
		address : post.bio.address,
		educations : post.colleges,
		experiences: post.experiences,
		skills : post.skills,
		portfolios: post.portfolios,
		isactive : true
	});

	var mailOptions = {
	    from: 'Fred Foo <foo@blurdybloop.com>', // sender address
	    to: post.bio.email, // list of receivers
	    subject: 'Hello', // Subject line
	    text: 'Hello world', // plaintext body
	    html: '<b>Hello world</b>' // html body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});

});

module.exports = router;