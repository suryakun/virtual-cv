var express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	easyimage = require('easyimage');

router.post('/avatar', [multer({
		dest: './public/assets/avatar',
		rename: function(fieldname, filename){
			return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
		},
		limits: {
			fieldNameSize :100,
			files: 1,
			fields: 5
		},
		onFileUploadStart: function (file) {
			console.log(file.fieldname + ' is starting ...')
		},
		onFileUploadData: function (file, data) {
			console.log(data.length + ' of ' + file.fieldname + ' arrived')
		},
		onFileUploadComplete: function (file) {
			console.log(file.fieldname + ' uploaded to  ' + file.path);
			easyimage.rescrop({
				src: './' + file.path,
				dst: './public/assets/avatar/crop/' + file.name,
				width: 500,
				height:500,
				cropwidth: 128,
				cropheight: 128,
				x: 0,
				y: 0
			}).then(function(image){
				console.log(image);
			},function(err){
				console.log(err);
			});
		}
	}), function(req, res){
		var fullpath = '/assets/avatar/' + req.files.file.name;
	    console.log(req.files.file); // form files	    
	    console.log(fullpath); // form files	    
	    res.end(fullpath);
	}
]);

router.get('/avatar', function(req,res){

});


module.exports = router;
