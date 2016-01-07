module.exports = {

    findByManufacturerId: function(req, res) {
    var man_id = req.param('man_id');
    Model.findAll({where:{ 'ManufacturerId' : man_id}}).then(function (models) {

        res.json(models);

    }).catch(function(err) {
      res.send(400);
    });
  }
};