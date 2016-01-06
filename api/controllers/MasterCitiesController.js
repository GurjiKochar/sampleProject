/**
 * MasterCitiesController
 *
 * @description :: Server-side logic for managing Mastercities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  findAll: function (req, res) {
        MasterCities.findAll().then(function (cities) {
            res.json(cities);
          }).catch(function (err) {
            console.log(err);
            res.send(400);
        });
    },
  find : function(req, res) {
    MasterCities.findOne({where:{id : req.param('id')}}
      ).then(function(city) {
        res.json(city);
      }).catch(function(err) {
        console.log(err);
        res.send(400);
      });
  }
};

