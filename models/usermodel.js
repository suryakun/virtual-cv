var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Promise = require('promise');

var UserSchema = new Schema({
	fullname: {
		type: String,
		require: true
	},
	objective : {
		type: String,
		require: false
	},
	email: {
		type: String,
		require: true
	},
	gender: {
		type: String,
		require: true 
	},
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	token_password: {
		type: String,
		require: false
	},
	token_reset:{
		type: String,
		require: false
	},
	phone: {
		type: Number,
		require: false
	},	
	address: {
		type: String,
		require: true
	},
	pro: {
		type: String,
		require: false	
	},
	educations: [{
		name: {
			type: String,
			require: false
		},
		degree: {
			type: String,
			require: false
		}		
	}],
	skill: [{
		name: {
			type: String,
			require: false
		},
		level: {
			type: String,
			require:false
		}
	}],
	experiences: [{ company_name: {
						type: String,
						require: false
					},
					position: {
						type: String,
						require: false
					},
					start_date:{
						type:Date,
						require: false
					},
					end_date:{
						type:Date,
						require: false
					},
					job_desc: {
						type: String,
						require: false
					}
				}],
	portfolios: [{ title: {
						type: String,
						require: false	
					},					
					images: [{ url: {
						type: String,
						require: false	
					} }],
					description: {
						type: String,
						require: false
					},
					url: {
						type: String,
						require: false
					}
				}],
	prestation: [{
					title: {
						type: String,
						require: false
					},
					description: {
						type: String,
						require: false
					}
				}],
	socialactifity : [{
					title: {
						type: String,
						require: false
					},
					description: {
						type: String,
						require: false
					}
				}],
	certification: [{
					title: {
						type: String,
						require: false
					},
					description: {
						type: String,
						require: false
					}
				}],
	createdat: {
		type: Date,
		default: Date.now
	},
	isactive: {
		type: Boolean
	}
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.genSalt(10 , function(err, salt){
		bcrypt.hash(user.password, salt, function(error, hash){
			if (error) return next(error);
			user.password = hash;
			next()
		});
	});
});

UserSchema.methods.comparePassword = function(password, next){
	var user = this;
	var state = undefined;
	authentication = new Promise(function(resolve, reject){
		bcrypt.compare(password, user.password, function(error, isMatch){
			if (error) console.log(error);
			resolve(isMatch);
		});
	});

	authentication.then(function(data){
		next(data);
	},function(error){
		console.log(error);
	});
};

module.exports = mongoose.model('User', UserSchema);