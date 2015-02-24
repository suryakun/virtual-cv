var mailer = require('../config/mailer'),
	path = require('path'),
	emailTemplate = require('email-templates');

var templateDir = path.resolve(__dirname, '..', 'public/mailer');

var executeMailer = function(templateName, params, fn){
	emailTemplate(templateDir, function(error, template){
		template(templateName, params, function(err, html, text){
			var mailOptions = {
			    from: 'Surya <surya.ramshere@gmail.com>', // sender address
			    to: params.to, // list of receivers
			    subject: params.subject, // Subject line
			    html: html // html body
			};

			console.log(text);
			mailer.sendMail(mailOptions, function(error, info){
			    if(error) return fn(error, info);			        
		        return fn(null, info);
			});
		});
	});
}

module.exports = executeMailer;