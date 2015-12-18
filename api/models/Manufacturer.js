/**
* Manufacturer.js
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
  	Manufacturer.hasMany(Model , {
  		foreignKey : {
  			name : 'ManufacturerId',
  			as : 'models'
  		}
  	});

  	Manufacturer.hasMany(Vehicle , {
      foreignKey : {
        name : 'ManufacturerId',
        as : 'vehicles'
      }
    });
  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'manufacturers',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

