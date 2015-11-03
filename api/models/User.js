/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'someMysqlServer',
  migrate: 'alter',
  tableName: 'users',
  attributes: {
  	id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'user_id'
    },
    name: {
      type: 'string',
      columnName: 'full_name'
    },
    password: {
      type: 'string',
      columnName: 'password'
    },
    mobileNumber: {
      type: 'integer',
      unique: true,
      columnName: 'mobile_number'
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email'
    },
	vehicle: {
		collection : 'vehicle',
		via :'user'
	}
  },


    /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    User.create({
      name: inputs.name,
      email: inputs.email,
      mobileNumber:inputs.mobile_number,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  },



  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.mobileNumber,
      // TODO: But encrypt the password first
      password: inputs.password
    })
    .exec(cb);
  }



};

