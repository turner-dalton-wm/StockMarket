/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getStock: function(req, res) {
        var id = req.param('id');
        if(!id) return res.badRequest('No ID');
        if (!req.isSocket) return res.badRequest('No Socket');
        sails.sockets.join(req, 'stock');
        sails.sockets.blast('hello', {id: id});
    }
};

