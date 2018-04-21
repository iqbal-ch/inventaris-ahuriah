var authController = require('../controllers/authcontroller.js');
var barangController = require('../controllers/barangcontroller.js');
var userController = require('../controllers/usercontroller.js');
var transaksiController = require('../controllers/transaksicontroller.js');
var logController = require('../controllers/logcontroller.js');

 
module.exports = function(app,passport) {
 	function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();  
    res.redirect('/login');
    }

    function isAdmin(req,res,next){
    if(req.user.role == 'admin')
        return next();
    res.redirect('/daftar/barang')    
    }

    function isBasic(req,res,next){
    if(req.user.role == 'basic')
        return next();
    res.redirect('/login')
    }



    //untuk admin
    app.get('/dashboard',isLoggedIn,isAdmin,authController.dashboard); 

    //punya jenis barang
    app.get('/index/jenis-barang',isLoggedIn,isAdmin,barangController.indexjenisbarang);    //sudah
    app.get('/index/rusak',isLoggedIn,isAdmin,barangController.barangrusak);    //sudah
    app.get('/tambah/jenis-barang',isLoggedIn,isAdmin,barangController.tamabahjenisbarang); //sudah
    app.get('/detail/jenis-barang/:id',isLoggedIn,isAdmin,barangController.detailjenisbarang); //udah
    app.get('/ubah/jenis-barang/:id',isLoggedIn,isAdmin,barangController.ubahjenisbarang);  //sudah
    app.get('/hapus/jenis-barang/:id',isLoggedIn,isAdmin,barangController.removejenisbarang) //sudah 
    app.put('/update/jenis-barang',isLoggedIn,isAdmin,barangController.updatejenisbarang); //sudah 
    app.post('/simpan/jenis-barang',isLoggedIn,isAdmin,barangController.simpanjenisbarang); //sudah

    //punya barang
    app.get('/index/barang',isLoggedIn,isAdmin,barangController.indexbarang); //sudah
    app.get('/tambah/barang',isLoggedIn,isAdmin,barangController.tambahbarang);  //udah
    app.get('/detail/barang/:id',isLoggedIn,isAdmin,barangController.detailbarang); //sudah
    app.get('/ubah/barang/:id',isLoggedIn,isAdmin,barangController.ubahbarang); //sudah
    app.get('/hapus/barang/:id',isLoggedIn,barangController.removebarang) //sudah
    app.put('/update/barang',isLoggedIn,barangController.updatebarang); //sudah
    app.post('/simpan/barang',isLoggedIn,barangController.simpanbarang); // udah

    //punya user
    app.get('/index/user',isLoggedIn,isAdmin,userController.indexuser); //udah
    app.get('/tambah/user',isLoggedIn,isAdmin,userController.tambahuser); //udah
    app.get('/detail/user/:id',isLoggedIn,isAdmin,userController.detailuser);
    app.get('/ubah/user/:id',isLoggedIn,isAdmin,userController.ubahuser); //udah
    app.get('/hapus/user/:id',isLoggedIn,isAdmin,userController.removeuser); //udah
    app.put('/update/user',isLoggedIn,isAdmin,userController.updateuser); //udah
    app.post('/simpan/user',isLoggedIn,isAdmin,userController.simpanuser); //udah
    //app.get('/profil/:id',isLoggedIn,isAdmin,userController.detailprofil);

    //transakasi 
    app.get('/index/transaksi',isLoggedIn,isAdmin,transaksiController.indextransaksi); //udah
    app.get('/tambah/transaksi',isLoggedIn,isAdmin,transaksiController.tambahtransaksi); //udah
    app.post('/simpan/peminjaman',isLoggedIn,isAdmin,transaksiController.simpantransaksi); //udah
    app.get('/detail/transaksi/:id',isLoggedIn,isAdmin,transaksiController.detailtransaksi);
    app.get('/kembalikan/:id',isLoggedIn,isAdmin,transaksiController.kembalikan);

    //log 
    app.get('/index/log',isLoggedIn,isAdmin,logController.indexlog); //udah 


    
    //untuk user
    app.get('/daftar/barang',isLoggedIn,isBasic,barangController.daftarbarang); //udah 
    app.get('/edit/barang/:id',isLoggedIn,isBasic,barangController.editbarang); //udah
    app.get('/lihat/barang/:id',isLoggedIn,isBasic,barangController.lihatbarang); //sudah

    //udah
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    //udah
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/index/transaksi',
        failureRedirect: '/login'
    }));

    app.get('/signup', authController.signup);   //udah
    app.get('/login', authController.login);        //udah
    app.get('/logout',authController.logout);       //udah
}