/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
        view: function(req, res) {
                res.view('public/stock/index');
        },
        connect: function(req, res) {
                if (!req.isSocket) return res.badRequest('No Socket');
                sails.sockets.join(req, 'stock');
                sails.sockets.blast('response', {id: 100});
        }
};

