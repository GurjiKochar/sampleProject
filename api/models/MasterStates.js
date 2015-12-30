/**
* MasterStates.js
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
  	MasterStates.hasMany(MasterCities , {
  		foreignKey : {
  			name : 'MasterStatesId',
  			as : 'cities'
  		}
  	});
  	MasterStates.belongsTo(MasterCountries,{
  		foreignKey : {
  			name : 'MasterCountriesId',
  			as : 'countries'
  		}
  	});
  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'master_states',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

