var express = require('express'),
	router = express.Router(),
	User = require('../models/usermodel');

router.get('/checkingemail/:email', function(request, response){
	User.findOne({ 'email' : request.params.email }, 'email', function(error, email){
		console.log(request.params.email);
		if (error) console.log(error);
		if (email == null) {
			response.send(true);
		}else{
			response.send(false);
		}
	});
});

module.exports = router;