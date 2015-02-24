var nodemailer = require('nodemailer'),
	emailTemplate = require('email-templates');

var transporter = nodemailer.createTransport({
	service : 'Gmail',
	auth : {
		user : 'surya.ramshere@gmail.com',
		pass : 'sakuragi291106'
	}
});

module.exports = transporter;