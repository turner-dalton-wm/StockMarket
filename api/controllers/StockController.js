/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    view: function(req, res) {
        res.view('public/stocks/index');
    },
    viewAll: function(req, res) {
        res.view('public/stocks/all/index');
    },
    connect: function(req, res) {
        var stockName = req.param('name');
        if(!stockName) return res.badRequest('No Name Param');
        if (!req.isSocket) return res.badRequest('No Socket');
        sails.sockets.join(req, 'stock_' + stockName);
        sails.sockets.blast('response', {name: stockName});
    }
};

