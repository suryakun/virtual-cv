var express = require('express'),
	User = require('../models/usermodel'),
	bcrypt = require('bcrypt'),
	mailer = require('../middlewares/mailer-middleware'),		
	router = express.Router();

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
		username : post.bio.email,
		password : pwd,
		token_password : post.bio.email + '_' + timeNow.toLocaleDateString(),
		token_reset : post.bio.username + '_' + timeNow.toLocaleDateString(),
		phone : null,
		address : post.bio.address,
		educations : post.colleges,
		experiences: post.experiences,
		skills : post.skills,
		portfolios: post.portfolios,
		isactive : true,
		cv: null
	});

	bcrypt.genSalt(10, function(err,salt){
		if (err) console.log(err);
		bcrypt.hash(user.password, salt, function(error, hash){
			user.password = hash;
			user.save(function(err,log){
				if (err) console.log(err);
				mailer('registration', {to: post.bio.email, subject: 'Registration Confirmation', username: post.bio.username, password: pwd }, function(err, message){
					if (err) console.log(err);
					console.log('sent');
					respond.end('ok');
				});	
			});
		});
	});

});

module.exports = router;