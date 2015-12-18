/**
 * VehicleController
 *
 * @description :: Server-side logic for managing Vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // a CREATE action  
    create: function(req, res, next) {
        
        var params = req.params.all();

        var v = {};

        v.UserId = 1;
        v.ManufacturerId = params.manufacturerId;
        v.BodyTypeId = params.bodyTypeId;
        v.ModelId =params.modelId;
        v.MasterCitiesId =params.cityId;
        v.maxPrice =params.maxPrice;
        v.yearOfManufacture = params.yearOfManufacture;
        v.isSponsoredListing = params.isSponsoredListing;
        console.log(v);
        Vehicle.create(v).then(function(vehicle) {

            res.status(201);

            res.json(vehicle);

        }).catch(function(err) {
            if (err) console.log(err); return next(err);
        });
    },

    // an UPDATE action
    update: function(req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);
        console.log(criteria);
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        var where = { where : {id : req.param('id')}};

        Vehicle.update(criteria, where).then(function(rows) {

            if (rows.length === 0) return res.notFound();
            return res.status(201);


        }).catch(function(err) {
            if (err) return next(err);
        });

    },

    // a DESTROY action
    destroy: function(req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        Vehicle.findById(id).then(function(result) {
            

            if (!result) return res.notFound();

            Vehicle.destroy(id).then(function(err) {

                return res.json(result);

            }).catch(function(err) {
                if (err) return next(err);
            });

        }).catch(function(err) {
            if (err) return res.serverError(err);
        });
    },


    // a FIND action
    find: function(req, res, next) {

        var id = req.param('id');
        var where = {};
        var locationFilter = { model: MasterCities , attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
        var makeFilter = {model :Manufacturer, attributes:['name']};
        var modelFilter = {model : Model , attributes:['name']};
        var bodyTypeFilter = {model : BodyType , attributes:['name']};

        if (id) {
            where.id = id;
            Vehicle.findAndCountAll({
                where : where,
                include: [locationFilter, makeFilter , modelFilter,bodyTypeFilter],
                attributes: {exclude : ['UserId','updatedAt','deletedAt']}
            }).then(function(vehicle) {

                if (vehicle === undefined) return res.notFound();

                res.json(vehicle);

            }).catch(function(err) {

                if (err) return next(err);

            });

        } else {

            if (req.query.yearOfManufacture) {
                where.yearOfManufacture = {$gte: req.query.yearOfManufacture} ;
            }

            if (req.query.maxPrice) {
                where.maxPrice = {$lte: req.query.maxPrice} ;
            }
            if (req.query.minPrice) {
                where.maxPrice = {$gte: req.query.minPrice} ;
            }

            if (req.query.maxPrice && req.query.minPrice) {
                where.maxPrice = {$and: [{$lte: req.query.maxPrice},{$gte: req.query.minPrice}]};
            }

            if (req.query.bdTypeId) {
                where.BodyTypeId = req.query.bdTypeId ;
            }
            if (req.query.makeId) {
                where.ManufacturerId = req.query.makeId ;
            }
            if (req.query.modelId) {
                where.ModelId = req.query.modelId ;
            }
            if (req.query.cityId) {
                where.MasterCitiesId = req.query.cityId ;
            }
            if (req.query.locationType == 'city') {
                var location = StringService.capitalizeFirstLetter(req.query.city);
                locationFilter = { model: MasterCities, where: {name : location} ,attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
            } else if (req.query.locationType == 'state') {
                var location = StringService.capitalizeFirstLetter(req.query.state);
                locationFilter = { model: MasterCities ,attributes:['name'] , include : [{model : MasterStates ,where: {name : location}, attributes:['name'] }]};
            }
            
            if (req.query.make) {
                makeFilter = {model :Manufacturer , where: {name : req.query.make} ,attributes:['name']};
            }

            if (req.query.model) {
                modelFilter = {model :Model , where: {name : req.query.model} ,attributes:['name']};
            }

            if (req.query.bodyType) {
                 var bdType = StringService.capitalizeFirstLetter(req.query.bodyType);
                 bodyTypeFilter = {model :BodyType , where: {name : bdType} ,attributes:['name']};
            }

            Vehicle.findAndCountAll({
                where : where,
                include: [locationFilter, makeFilter , modelFilter,bodyTypeFilter],
                attributes: {exclude : ['UserId','updatedAt','deletedAt']}
            }).then( function(vehicle) {

                if (vehicle === undefined) return res.notFound();

                res.json(vehicle);

            }).catch(function(err) {
                if (err) return next(err);
            });
        }
    }
};

