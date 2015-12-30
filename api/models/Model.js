/**
* Model.js
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
  	Model.belongsTo(Manufacturer,{
  		foreignKey : {
  			name : 'ManufacturerId',
  			as : 'manufacturers'
  		}
  	});

  	Model.hasMany(Vehicle , {
      foreignKey : {
        name : 'ModelId',
        as : 'vehicles'
      }
    });
  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'model',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

