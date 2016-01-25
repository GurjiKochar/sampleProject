var path = require('path');
module.exports = {
	create: function (req, res, next) {
		req.file('file').upload({
      dirname: path.resolve(sails.config.appPath, './assets/images/uploads/' + req.param('id'))
    },function (err, uploadedFiles) {
        console.log(uploadedFiles);

      if (err) return res.negotiate(err);
      var photo = {
      	VehicleId: req.param('id'),
      	url: uploadedFiles[0].fd.split('assets')[1],
      	name: uploadedFiles[0].filename
      }

      VehiclePhoto.create(photo).then(function(photo) {
        res.status(201);
        res.json(photo);
      }).catch(function(err) {
        if (err) console.log(err); return next(err);
      });
    });
	}
}

