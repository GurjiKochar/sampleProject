module.exports = {
    // Find All action

    findAll: function (req, res) {

        Manufacturer.findAll().then(function (manufacturer) {
            res.json(manufacturer);
        }).catch(function(err) {
            res.send(400);
        });
    },
    find : function(req, res) {
      Manufacturer.findOne({where:{id : req.param('id')}}
        ).then(function(manufacturer) {
          res.json(manufacturer);
        }).catch(function(err) {
          res.send(400);
        });
    }
};
