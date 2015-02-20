var express = require('express'),
	User = require('../models/usermodel'),
	bcrypt = require('bcrypt'),
	router = express.Router();

router.get('/',function(request,respond){
	respond.render('index');
});

router.post('/save_register', function(request,respond){
	var timeNow = new Date();
	var post = request.body;
	var user = new User({
		fullname: post.bio.fullname,
		email : post.bio.email,
		gender : post.bio.gender,
		username : post.bio.username,
		password : post.bio.email,
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

	user.save(function(error){
		if (error) console.log(error);
		respond.end('true');
	});
});

module.exports = router;