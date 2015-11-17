/**
* Master_cities.js
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
		state: {
			model: 'master_states',
			columnName: 'state_id',
			required: true
		},
		vehicle: {
			collection : 'vehicle',
			via :'cities'
		}
	}
};

