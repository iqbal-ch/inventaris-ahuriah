var exports = module.exports = {}
 
 exports.signup = function(req, res) {
     res.render('signup',{layout: false});
 }

exports.login = function(req, res) {
    res.render('login',{layout: false});
}

exports.dashboard = function(req, res) {
     res.render('dashboard',{
        nama: req.user.nama,
        role: req.user.role
     });
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}