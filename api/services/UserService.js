module.exports = {


	signup: function (inputs, cb) {
    
		var Passwords = require('machinepack-passwords');

	    // Encrypt a string using the BCrypt algorithm.
	    Passwords.encryptPassword({
	      password: inputs.password,
	      difficulty: 10,
	    }).exec({
	      // An unexpected error occurred.
	      error: function(err) {
	        return res.negotiate(err);
	      },
	      // OK.
	      success: function(encryptedPassword) {
	        require('machinepack-gravatar').getImageUrl({
	          emailAddress: inputs.email
	        }).exec({
	          error: function(err) {
	            return res.negotiate(err);
	          },
	          success: function(gravatarUrl) {
	          // Create a User with the params sent from
	          // the sign-up form --> signup.ejs
	            User.create({
	              name: inputs.name,
	              email: inputs.email,
	              mobileNumber:inputs.mobileNumber,
	              password: encryptedPassword,
	              lastLoggedIn: new Date(),
	              gravatarUrl: gravatarUrl
	            }).exec(cb);
	          }
	        });
	       }
	      });
	},


	logout: function (inputs, cb) {
		console.log('===========----------------------'+inputs.id);
		User.findOne(inputs.id).exec(cb);

	},


	login: function (inputs, cb) {


	}


};