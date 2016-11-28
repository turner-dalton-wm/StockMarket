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
        /*Stock.create({name: stockName, price: 25, lastDate: '2016-11-28T20:36:24.864Z', history: [18,19,20,21,22,23,24,25,26,27,28,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,10,11,12,13,14,15,16,17,18,19,20,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,7,8,9,10,11,12,13,14,15,16,17,16,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15]
        }, function(err, stock) {
            if(err) console.log(err);
            //console.log(stock);
        });*/
        Stock.find({name: stockName}, function(err, stock) {
            if(err) throw err;
            //console.log(stock);
            sails.sockets.blast('response', stock);
        });
    },
    connectAll: function(req, res) {
        if (!req.isSocket) return res.badRequest('No Socket');
        sails.sockets.join(req, 'stocks');

        Stock.find({}, function(err, stocks) {
            if(err) console.log(err);
            sails.sockets.blast('response', stocks);
        });
    },
    update: function(req, res) {
        Stock.update({name: ''}, {data: []}, {upsert: true}, function(err, stock) {
            if(err) throw err;
            console.log(stock);
        });
    }
};

