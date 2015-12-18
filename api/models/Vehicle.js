/**
* Vehicle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  		minPrice: {
		    type: Sequelize.FLOAT
		},
		maxPrice: {
		    type: Sequelize.FLOAT
		},
		yearOfManufacture:{
			type: Sequelize.INTEGER
		},
		kmsDriven: {
			type : Sequelize.INTEGER
		},
		regestrationNumber : {
			type : Sequelize.STRING
		},
		tyreCondition : {
			type : Sequelize.STRING
		},
		insurance: {
			type : Sequelize.STRING
		},
		rc_status : {
			type : Sequelize.STRING
		},
		isSponsoredListing : {
			type : Sequelize.BOOLEAN
		}
  },
  associations: function () {
  	Vehicle.belongsTo(User ,{
  		foreignKey : {
  			name : 'UserId',
  			as : 'users'
  		}
  	});
  	Vehicle.belongsTo(MasterCities ,{
  		foreignKey : {
  			name : 'MasterCitiesId',
  			as : 'cities'
  		}
  	});
  	Vehicle.belongsTo(Manufacturer ,{
  		foreignKey : {
  			name : 'ManufacturerId',
  			as : 'manufacturers'
  		}
  	});
  	Vehicle.belongsTo(Model ,{
  		foreignKey : {
  			name : 'ModelId',
  			as : 'models'
  		}
  	});
  	Vehicle.belongsTo(BodyType ,{
  		foreignKey : {
  			name : 'BodyTypeId',
  			as : 'bodyTypes'
  		}
  	});
  },
  options: {
    freezeTableName: false,
    timestamps: true,
    paranoid: true,
    tableName: 'vehicle',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};


sequelize.sync();

