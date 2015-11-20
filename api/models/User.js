/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'someMysqlServer',
  migrate: 'alter',
  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  tableName: 'users',
  attributes: {
    name: {
      type: 'string',
      columnName: 'full_name',
      required: true
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email',
      required: true
    },
    mobileNumber: {
      type: 'string',
      unique: true,
      required: true,
      columnName: 'mobile_number'
    },
    password: {
      type: 'string',
      columnName: 'password',
      required: true
    },
    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    // url for gravatar
    gravatarUrl: {
      type: 'string'
    },

  	vehicle: {
  		collection : 'vehicle',
  		via :'user'
  	}
  }



};

