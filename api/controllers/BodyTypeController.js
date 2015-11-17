module.exports = {

    // a FIND action
    findAll: function (req, res) {
        BodyType.find().exec(function (err, bodyType) {
          if (err) {
            res.send(400);
          } else {
            res.send(bodyType);
          }
        });
    }
};