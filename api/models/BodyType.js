/**
* BodyType.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
  		type: Sequelize.STRING, 
  		allowNull: false
  	}
  },
  associations: function () {
  	BodyType.hasMany(Vehicle , {
  		foreignKey : {
  			name : 'BodyTypeId',
  			as : 'vehicles'
  		}
  	});
  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'body_types',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

