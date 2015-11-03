/**
* Master_states.js
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
		name: {
		  type: 'string',
		  columnName: 'name'
		},
		country: {
			model: 'master_countries',
			columnName: 'country_id',
			required: true
		},
		cities: {
			collection : 'master_cities',
			via :'state'
		}
	}
};

