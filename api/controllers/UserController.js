/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      email: req.param('email')
    }).then(function foundUser(user) {
      
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({

        error: function (err){
          console.log(err);
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

          // Store user id in the user session
          req.session.me = user.id;

          // All done- let the client know that everything worked.
          return res.redirect('/');
        }
      });
    }).catch(function(err) {
      if (err) {
        console.log(err);
        return res.negotiate(err);
      }
    });

  },

  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    UserService.logout({ id : req.session.me }, function foundUser(user) {
      

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.redirect('/');
      }

      // Wipe out the session (log out)
      req.session.me = null;

      // Either send a 200 OK or redirect to the home page
      return res.redirect('/');

    }, function (err) {
      if (err) return res.negotiate(err);
    });
  },

  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {

    // Attempt to signup a user using the provided parameters
    console.log(req.session.otp);
    console.log(req.param('otp'));
    if (req.param('otp') == req.session.otp) {
    UserService.signup({
      name: req.param('name'),
      email: req.param('email'),
      mobileNumber: req.param('mobileNumber'),
      password: req.param('password')
    }, function (user) {
      
      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.me = user.id;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/');
    }, function(err) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) {

        console.log("err: ", err);
        console.log("err.invalidAttributes: ", err.invalidAttributes)

        // If this is a uniqueness error about the email attribute,
        // send back an easily parseable status code.
        if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
          && err.invalidAttributes.email[0].rule === 'unique') {
          return res.emailAddressInUse();
        }

        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
    });
    } else {
      res.badRequest('OTP did not match');
    }
  },

  sendOtp: function (req, res) {

    // Attempt to signup a user using the provided parameters
    User.find({where :
      {mobileNumber: req.param('mobileNumber')}
    }).then( function (user) {
      
      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      console.log(user);
      if (user == null) {
        req.session.user = req.params.all();
        req.session.otp = 123456;
        return res.ok('Verify Phone number');
      } else {
        return res.badRequest('Phone number already in use')
      }

    }).catch( function(err) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) {

        console.log("err: ", err);

        // Otherwise, send back something reasonable as our error response.
        return res.negotiate(err);
      }
    });
  }
};

