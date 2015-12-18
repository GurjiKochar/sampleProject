/**
* MasterCountries.js
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
  	MasterCountries.hasMany(MasterStates , {
  		foreignKey : {
  			name : 'MasterCountriesId',
  			as : 'states'
  		}
  	});
  },

  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'master_countries',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

