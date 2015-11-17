module.exports = {
    // Find All action

    findAll: function (req, res) {
        MasterCities.find().exec(function (err, cities) {
          if (err) {
            res.send(400);
          } else {
            res.send(cities);
          }
        });
    }
};