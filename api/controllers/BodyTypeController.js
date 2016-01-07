module.exports = {

    // a FIND action
    
    findAll: function (req, res) {

        BodyType.findAll().then(function (bodyType) {
            res.json(bodyType);
        }).catch(function(err) {
            res.send(400);
        });
    },
    find : function(req, res) {
      BodyType.findOne({where:{id : req.param('id')}}
        ).then(function(bodyType) {
          res.json(bodyType);
        }).catch(function(err) {
          res.send(400);
        });
    }
};