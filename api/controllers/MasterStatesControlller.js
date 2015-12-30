module.exports = {
  
  findAll: function (req, res) {
        MasterStates.find().then(function (states) {
            res.json(states);
          }).catch(function (err) {
            console.log(err);
            res.send(400);
        });
    },
  find : function(req, res) {
    MasterStates.findOne({where:{id : req.param('id')}}
      ).then(function(state) {
        res.json(state);
      }).catch(function(err) {
        console.log(err);
        res.send(400);
      });
  }
};