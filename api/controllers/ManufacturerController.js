module.exports = {
    // Find All action

    findAll: function (req, res) {
        console.log('===============i was here =============');
        Manufacturer.find().exec(function (err, manufacturer) {
          if (err) {
            res.send(400);
          } else {
            res.send(manufacturer);
          }
        });
    }
};