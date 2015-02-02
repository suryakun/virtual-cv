var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	name: {
		first: String,
		middle: String,
		last: String
	},
	email: String,
	username: String,
	password: String,
	set_password_token: String,
	phone: number,
	address: String,
	experiences: [{company_name:String, 
					start_date:{
						type:Date
					},
					end_date:{
						type:Date
					},
					job_desc:String}];
	portfolios: [{title:String,
					images: [{ url: String }],
					description: String}]
});

Schema.pre("save", true, function(next,done){
	bcrypt.hash(this.password,null,null, function(err, hash){
		if (err) console.log(err);
		this.password = hash;
		next();
	});
});

Schema.compare = function(dbpassword,password){
	bcrypt.compare(password,dbpassword,function(err,res){
		if (err) console.log(err);
		return res;
	});
};

module.exports = mongoose.model('User', UserSchema);