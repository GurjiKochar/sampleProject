module.exports = {


	signup: function (inputs, cb ,err) {
    
		var Passwords = require('machinepack-passwords');

	    // Encrypt a string using the BCrypt algorithm.
	    Passwords.encryptPassword({
	      password: inputs.password,
	      difficulty: 10,
	    }).exec({
	      // An unexpected error occurred.
	      error: function(err) {
	      	console.log(" err occured")
	        return res.negotiate(err);
	      },
	      // OK.
	      success: function(encryptedPassword) {
	          // Create a User with the params sent from
	          // the sign-up form --> signup.ejs
	            User.create({
	              name: inputs.name,
	              email: inputs.email,
	              mobileNumber:inputs.mobileNumber,
	              password: encryptedPassword
	            }).then(cb).catch(err);
	        }
	      });
	},


	logout: function (inputs, cb, err) {
		
		User.findById(inputs.id).then(cb).catch(err);

	},


	login: function (inputs, cb) {


	}


};