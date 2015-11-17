/**
* Vehicle.js
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
	attributes: {
		minPrice: {
		    type: 'float'
		},
		maxPrice: {
		    type: 'float'
		},
		yearOfManufacture:{
			type: 'string'
		},
		kmsDriven: {
			type : 'string'
		},
		regestrationNumber : {
			type : 'string'
		},
		tyreCondition : {
			type : 'string'
		},
		insurance: {
			type : 'string'
		},
		rc_status : {
			type : 'string'
		},
		listedBy : {
			type : 'string',
			enum: ['Dealer', 'Individual']
		},
		isSponsoredListing : {
			type : 'boolean'
		},
		user: {
			model: 'user',
			columnName: 'user_id',
			required: true
		},
		manufacturer: {
			model: 'manufacturer',
			columnName: 'manufacturer_id',
			required: true
		},
		bodyType: {
			model: 'bodyType',
			columnName: 'bodyType_id',
			required: true
		},
		modelName: {
			model: 'modelName',
			columnName: 'modelName_id',
			required: true
		},
		cities: {
			model: 'masterCities',
			columnName: 'city_id',
			required: true
		}

	}
};

