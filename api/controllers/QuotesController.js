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

        quote.name = params.name;
        quote.mobileNumber = params.mobileNumber;
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
        console.log(req.query);
        if (req.query.stateId) {
            locationFilter = { model: MasterCities , where : {MasterStatesId : req.query.stateId}, attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
        }
        if (req.query.action) {
            where.action = req.query.action;
        }
        var makeFilter = {model :Manufacturer, attributes:['name']};
        var modelFilter = {model : Model , attributes:['name']};
        var bodyTypeFilter = {model : BodyType , attributes:['name']};
        var userFilter = {model : User, attributes: ['name','mobileNumber']};
        var vehicleFilter = {model :Vehicle , include: [locationFilter, makeFilter , modelFilter,bodyTypeFilter, {model : User , attributes: ['name','mobileNumber'] }]};

        Quotes.findAndCountAll({
                where : where,
                include: [vehicleFilter],
                attributes: {exclude : ['updatedAt','deletedAt']}
            }).then( function(quote) {

                if (quote === undefined) return res.notFound();

                res.json(quote);

            }).catch(function(err) {
                if (err) return next(err);
            });
    },

    findForAssignee : function(req , res, next) {

        console.log("==========Here===========");
        console.log(req.session.me);
        var where = {};
        where.AssigneeId = req.session.me;
        if (req.query.action) {
            where.action = req.query.action;
        }
        var locationFilter = { model: MasterCities , attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
        if (req.query.stateId) {
            locationFilter = { model: MasterCities , where : {MasterStatesId : req.query.stateId}, attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
        }
        var makeFilter = {model :Manufacturer, attributes:['name']};
        var modelFilter = {model : Model , attributes:['name']};
        var bodyTypeFilter = {model : BodyType , attributes:['name']};
        var userFilter = {model : User, attributes: ['name','mobileNumber']};
        var vehicleFilter = {model :Vehicle , include: [locationFilter, makeFilter , modelFilter,bodyTypeFilter, {model : User , attributes: ['name','mobileNumber'] }]};
        console.log(where);
        Quotes.findAndCountAll({
                where : where,
                include: [vehicleFilter],
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

        Quotes.findAndCountAll({
                where : where,
                attributes: {exclude : ['updatedAt','deletedAt']}
            }).then( function(quote) {

                if (quote === undefined) return res.notFound();

                res.json(quote);

            }).catch(function(err) {
                if (err) return next(err);
            });
    },

    update : function(req, res, next) {
        var where = {};
        var id = req.param('id');
        if (id) {
            console.log(req.query);
            console.log(req.params);
            var action = req.query.action;

            Quotes.update({action : action}, {where : {id : id}})
            .then(function(quote) {

                if (quote === undefined) return res.notFound();
                return res.json(quote);

            }).catch(function(err) {
                    if (err) return next(err);
            });

        } else {

            return res.notFound();
        }
    },

    updateAssignee : function(req, res, next) {
        var self = this;
        if (req.session.me) {
            Quotes.update({AssigneeId : req.session.me} , {where : {id : req.param('id')}})
            .then(function(quote) {

                if (quote === undefined) return res.notFound();
                self.find(req, res, next);

            })
            .catch(function(err) {
                    if (err) return next(err);
            });
        } else {
            return res.status(400);
        }
    }
	
};

