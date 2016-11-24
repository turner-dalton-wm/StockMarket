/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    view: function(req, res) {
        res.view('public/users/index');
    },
    viewAll: function(req, res) {
        res.view('public/users/all/index');
    },
    connect: function(req, res) {
        var userName = req.param('name');
        if(!userName) return res.badRequest('No Name Param');
        if (!req.isSocket) return res.badRequest('No Socket');
        sails.sockets.join(req, 'user_' + userName);
        sails.sockets.blast('response', {name: userName});
    }
};

