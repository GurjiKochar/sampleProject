/**
* MasterCities.js
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
  	MasterCities.belongsTo(MasterStates,{
  		foreignKey : {
  			name : 'MasterStatesId',
  			as : 'states'
  		}
  	});

  	MasterCities.hasMany(Vehicle , {
      foreignKey : {
        name : 'MasterCitiesId',
        as : 'vehicles'
      }
    });
  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'master_cities',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

