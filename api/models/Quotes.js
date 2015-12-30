/**
* Quotes.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	bidPrice: {
		type: Sequelize.STRING
	},
	action: {
		type: Sequelize.STRING
	}
  },
  associations: function() {
  	Quotes.belongsTo(User ,{
  		foreignKey : {
  			name : 'UserId',
  			as : 'users'
  		}
  	});

  	Quotes.belongsTo(Vehicle ,{
  		foreignKey : {
  			name : 'VehicleId',
  			as : 'vehicle'
  		}
  	});
  },
	options: {
		freezeTableName: false,
		timestamps: true,
		paranoid: true,
		tableName: 'quotes',
		classMethods: {},
		instanceMethods: {},
		hooks: {}
	}
};

sequelize.sync();