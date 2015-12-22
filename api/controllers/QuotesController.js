/**
 * QuotesController
 *
 * @description :: Server-side logic for managing Quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res, next) {
        
        var params = req.params.all();

        var quote = {};

        quote.UserId = req.session.me;
        quote.VehicleId = params.vehicleId;
        quote.bidPrice = params.bid;
        Quotes.create(quote).then(function(quote) {

            res.status(201);

            res.json(quote);

        }).catch(function(err) {
            if (err) console.log(err); return next(err);
        });
    }
	
};

