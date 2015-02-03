var express = require('express');
var router = express.Router();
var User = require('../models/usermodel');

router.get('/create', function(request,response){
	var user = new User({
		fullname:'surya surakhman',
		email:'surya@test.com',
		username:'surya',
		password:'test',
		token_password: null,
		token_reset:null,
		phone:888888,
		address:'bandung',
		educations: [{
			name: 'sd lembur tengah cianjur',
			degree: 'sd'
		},{
			name: 'stmik bandung',
			degree: 'bachelor'
		}],
		experiances: [{
			company_name: 'wgs',
			start_date: new Date.now(),
			end_date: new Date.now(),
			job_desc: 'consulting'
		},
		{
			company_name: 'inmagine',
			start_date: new Date.now(),
			end_date: new Date.now(),
			job_desc: 'programming'
		}],
		portfolios: [{
			title: 'tos',
			images: [{ url: '/testt.com'}, {url:'testtt.com'}],
			description: 'testing'
		},{
			title: 'treee',
			images: [{ url: '/testt.com'}, {url:'testtt.com'}],
			description: 'tttttt'
		}],
		is_active : true
	});

	user.save(function(error){
		if (error) console.log(error);
		response.send('User Created');
	});

});

module.exports = router;