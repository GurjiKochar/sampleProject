module.exports = {

    findByManufacturerId: function(req, res) {
    var man_id = req.param('man_id');
    ModelName.find({ 'manufacturer_id' : man_id}).exec(function (err, models) {
      if (err) {
        console.log(err);
        res.send(400);
      } else {
        res.send(models);
      }
    });
  }
};