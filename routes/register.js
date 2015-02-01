var express = require('express'),
	router = express.Router();

router.get('/',function(request,respond){
	respond.render('index');
});

module.exports = router;