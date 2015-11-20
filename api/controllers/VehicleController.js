/**
 * VehicleController
 *
 * @description :: Server-side logic for managing vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// a CREATE action  
	create: function(req, res, next) {
        console.log ('====--------=========---------')
	    var params = req.params.all();

        var v = {};

        v.user = 1;
        v.manufacturer = params.manufacturerId;
        v.bodyType = params.bodyTypeId;
        v.modelName =params.model;
        v.cities =params.cityId;
        v.minPrice = params.minPrice;
        v.maxPrice =params.maxPrice;
        v.yearOfManufacture = params.yearOfManufacture;

	    Vehicle.create(v, function(err, vehicle) {

	        if (err) console.log(err); return next(err);

	        res.status(201);

	        res.json(vehicle);

	    });
	},


	// an UPDATE action
    update: function(req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Vehicle.update(id, criteria, function(err, vehicle) {

            if (vehicle.length === 0) return res.notFound();

            if (err) return next(err);

            res.json(vehicle);

        });

    },


    // a DESTROY action
    destroy: function(req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Vehicle.findOne(id).done(function(err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            Vehicle.destroy(id, function(err) {

                if (err) return next(err);

                return res.json(result);
            });

        });
    },

    // a FIND action
    find: function(req, res, next) {

        var id = req.param('id');

        console.log(req.session.me);

        console.log('tuyiujhgkjlkm');

        if (id) {

            Vehicle.findOne(id, function(err, vehicle) {

                if (vehicle === undefined) return res.notFound();

                if (err) return next(err);

                res.json(vehicle);

            });

        } else {

            var where = req.param('where');
            if (_.isString(where)) {
                where = JSON.parse(where);
            }

            var options = {
                limit: req.param('limit') || undefined,
                skip: req.param('skip') || undefined,
                sort: req.param('sort') || undefined,
                where: where || undefined
            };

            Vehicle.find(options, function(err, vehicle) {

                if (vehicle === undefined) return res.notFound();

                if (err) return next(err);

                res.json(vehicle);

            });

        }
    }
};

