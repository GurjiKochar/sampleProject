/**
 * QuotesController
 *
 * @description :: Server-side logic for managing Quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res, next) {
        
        var params = req.params.all();

        var quote = {};

        quote.UserId = req.session.me;
        quote.VehicleId = params.vehicleId;
        quote.bidPrice = params.bid;
        Quotes.create(quote).then(function(quote) {

            res.status(201);

            res.json(quote);

        }).catch(function(err) {
            if (err) console.log(err); return next(err);
        });
    },

    find : function(req , res, next) {
        var where = {};
        var locationFilter = { model: MasterCities , attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
        var makeFilter = {model :Manufacturer, attributes:['name']};
        var modelFilter = {model : Model , attributes:['name']};
        var bodyTypeFilter = {model : BodyType , attributes:['name']};
        var userFilter = {model : User, attributes: ['name','mobileNumber']};
        var vehicleFilter = {model :Vehicle , include: [locationFilter, makeFilter , modelFilter,bodyTypeFilter, {model : User , attributes: ['name','mobileNumber'] }]};

        Quotes.findAndCountAll({
                where : where,
                include: [userFilter, vehicleFilter],
                attributes: {exclude : ['updatedAt','deletedAt']}
            }).then( function(quote) {

                if (quote === undefined) return res.notFound();

                res.json(quote);

            }).catch(function(err) {
                if (err) return next(err);
            });
    },

    findForVehicle : function(req , res, next) {
        var where = {};
        var id = req.param('vehicleId');
        if (id) {
            where.VehicleId = id;
        }
        var userFilter = {model : User, attributes: ['name','mobileNumber']};

        Quotes.findAndCountAll({
                where : where,
                include: [userFilter],
                attributes: {exclude : ['updatedAt','deletedAt']}
            }).then( function(quote) {

                if (quote === undefined) return res.notFound();

                res.json(quote);

            }).catch(function(err) {
                if (err) return next(err);
            });
    }
	
};

