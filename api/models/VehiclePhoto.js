/**
* Model.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    url: {
  		type: Sequelize.STRING, 
  		allowNull: false
  	},
    name: {
      type: Sequelize.STRING, 
      allowNull: false
    }
  },
  associations: function () {
  	VehiclePhoto.belongsTo(Vehicle,{
  		foreignKey : {
  			name : 'VehicleId',
  			as : 'photos'
  		}
  	});

  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'vehicle_photo',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

