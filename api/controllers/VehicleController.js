/**
 * VehicleController
 *
 * @description :: Server-side logic for managing Vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

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
        v.isSponsoredListing = 0;
        v.isPublished = 0;
        Vehicle.create(v).then(function(vehicle) {
            //console.log(vehicle);
            var slug = params.manufacturer.replace(" ","-")+"-"+params.model.replace(" ","-")+"-"+params.bodyType+"-"+v.yearOfManufacture+"model-Rs"+v.maxPrice+"-"+vehicle.id;
            console.log(slug);
            Vehicle.update({slug : slug},{where : {id : vehicle.id}}).then(function(veh) {
                res.status(201);
                res.json(vehicle);
            }).catch(function(err) {
                if (err) console.log(err); return next(err);
            })
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
            return res.send(200 , {success : "Successfully updated"});


        }).catch(function(err) {
            if (err) return next(err);
        });

    },

    savePhotos: function(req, res, next) {
        console.log("reached here");
        // var data = _.pick(req.body, 'type')
        // , uploadPath = path.normalize('./uploads/' + req.param('id'))
        // , file = req.file('file');
        // console.log(req.file('file'));
        // var tempPath = req.file('file');
        //     targetPath = path.resolve('/Users/prashantchaudhary/sampleProject/uploads/image.png');
        // if (true) {
        //     fs.rename(file.path, targetPath, function(err) {
        //         if (err) throw err;
        //         console.log("Upload completed!");
        //     });
        // } else {
        //     fs.unlink(tempPath, function () {
        //         if (err) throw err;
        //         console.error("Only .png files are allowed!");
        //     });
        // }

        req.file('file').upload({
          dirname: path.resolve(sails.config.appPath, './assets/images/' + req.param('id'))
        },function (err, uploadedFiles) {
            console.log(uploadedFiles);

          if (err) return res.negotiate(err);

          req.body = {
                photos : [{url : uploadedFiles[0].UploadedFileMetadata}]
            }

          return res.json({
            message: uploadedFiles.length + ' file(s) uploaded successfully!'
          });
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
        var vehiclePhotos = {model: VehiclePhoto, attributes:['url', 'name']};

        if (id) {
            where.id = id;
            Vehicle.findAndCountAll({
                where : where,
                include: [locationFilter, makeFilter , modelFilter, bodyTypeFilter, vehiclePhotos],
                attributes: {exclude : ['UserId','updatedAt','deletedAt']}
            }).then(function(vehicle) {

                if (vehicle === undefined) return res.notFound();

                res.json(vehicle);

            }).catch(function(err) {

                if (err) return next(err);

            });

        } else {
            if (req.param('published')) {
                where.isPublished = false;

            } else {
                where.isPublished = true;
            }
            
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
                where.MasterCitiesId = JSON.parse(req.query.cityId) ;
            }
            if (req.query.locationType == 'city') {
                var location = JSON.parse(req.query.city);
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
                include: [locationFilter, makeFilter , modelFilter, bodyTypeFilter, vehiclePhotos],
                attributes: {exclude : ['UserId','updatedAt','deletedAt']}
            }).then( function(vehicle) {

                if (vehicle === undefined) return res.notFound();

                res.json(vehicle);

            }).catch(function(err) {
                if (err) return next(err);
            });
        }
    },


    // a FIND action
    findForUser: function(req, res, next) {

        var id = req.session.me;
        if (id) {

            var userFilter = {model : User , where: {id : id} , attributes: ['name','mobileNumber'] }
            var locationFilter = { model: MasterCities , attributes:['name'] , include : [{model : MasterStates, attributes:['name'] }]};
            var makeFilter = {model :Manufacturer, attributes:['name']};
            var modelFilter = {model : Model , attributes:['name']};
            var bodyTypeFilter = {model : BodyType , attributes:['name']};

        
            Vehicle.findAndCountAll({
                include: [userFilter, locationFilter, makeFilter, modelFilter, bodyTypeFilter],
                attributes: {exclude : ['UserId','updatedAt','deletedAt']}
            }).then(function(vehicle) {

                if (vehicle === undefined) return res.notFound();

                res.json(vehicle);

            }).catch(function(err) {

                if (err) return next(err);

            });

        }
    }
};

