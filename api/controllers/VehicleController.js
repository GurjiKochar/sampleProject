/**
 * VehicleController
 *
 * @description :: Server-side logic for managing vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// a CREATE action  
	create: function(req, res, next) {

	    var params = req.params.all();

	    Vehicle.create(params, function(err, vehicle) {

	        if (err) return next(err);

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

