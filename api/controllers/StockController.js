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
        if (!stockName) return res.badRequest('No Name Param');
        if (!req.isSocket) return res.badRequest('No Socket');
        sails.sockets.join(req, 'stock_' + stockName);

        Stock.find({where: {name: stockName}}, function(err, stock) {
            if(err) throw err;
            sails.sockets.blast('stock_' + stockName + '_response', stock);
        });

        setInterval(function() {
            Stock.find({where: {name: stockName}}, function(err, stock) {
                if(err) throw err;
                sails.sockets.blast('stock_' + stockName + '_response', stock);
            });
        }, 2000);
    },
    connectAll: function(req, res) {
        if (!req.isSocket) return res.badRequest('No Socket');
        sails.sockets.join(req, 'stocks');

        Stock.find({sort: 'name'}, function(err, stocks) {
            if(err) console.log(err);
            sails.sockets.blast('stocks_response', stocks);
        });

        setInterval(function() {
            Stock.find({sort: 'name'}, function(err, stocks) {
                if(err) console.log(err);
                sails.sockets.blast('stocks_response', stocks);
            });
        }, 2000);
    }
};

