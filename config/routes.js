/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /login': { view: 'User/login' },
  'get /signup': { view: 'User/signup' },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
    // Apis

    'post /login': 'UserController.login',
    'post /signup': 'UserController.signup',
    'post /sendOtp': 'UserController.sendOtp',
    'get /logout': 'UserController.logout',

    'get /api/vehicle/search/:id?': 'VehicleController.find',
    'POST /vehicle': 'VehicleController.create',
    'put /vehicle/:id': 'VehicleController.update',
    'delete /vehicle/:id?': 'VehicleController.destroy',

    'get /api/vehicle/user': 'VehicleController.findForUser',


    'get /api/cities/all' : 'MasterCitiesController.findAll',
    'get /api/cities/:id' : 'MasterCitiesController.find',

    //photos
    'POST /vehicle/:id/photos' : 'VehicleController.savePhotos',

  // Custom CRUD Rest Routes
    'get /sellvehicle': { view: 'vehicle/sellvehicle' },

    // Apis
    'get /api/admin/vehicle/search/:id?': 'VehicleController.find',
    'put /api/admin/vehicle/:id': 'VehicleController.update',
    'get /api/manufacturer/all': 'ManufacturerController.findAll',
    'get /api/manufacturer/modelnames/:man_id' : 'ModelNameController.findByManufacturerId',
    'get /api/bodytype/all' : 'BodyTypeController.findAll',
    'post /api/vehicle/bid': 'QuotesController.create',
    'get /api/vehicle/bid': 'QuotesController.find',
    'get /api/vehicle/bid/:vehicleId': 'QuotesController.findForVehicle',
    '/': { view: 'layout' }

};
