var exports = module.exports = {}
const multer = require('multer');
const path = require('path');
const user = require('../models').user

//load bcrypt
var bCrypt = require('bcrypt-nodejs');

var generateHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

exports.indexuser = (req, res) => {
  user.findAll()
    .then(user => {
      res.render('index-user', { 
        users: user,
        foto: req.user.avatar,
        nama: req.user.firstname
       })
    })
}

exports.detailuser = (req, res) => {
  nama = req.user.nama
  user.findOne({where: { id: parseInt(req.params.id) }})
    .then(user => {
      res.render('detail-user', { 
        user : user,
        nama
       })
    })
    .catch(err => console.error(err))
}

exports.tambahuser = (req, res) => {
  res.render('tambah-user',{
    nama: req.user.nama
  })
}

exports.simpanuser = (req, res) => {
  req.body.password = generateHash(req.body.password);
    user.create(req.body)
    .then((user) => {
      res.redirect(`/detail/user/${user.id}`)
    })
    .catch(err => console.error(err))
}

exports.ubahuser = (req, res) => {
  user.findOne({ where: { id: parseInt(req.params.id) } })
    .then((user) => {
      res.render('ubah-user', { 
        user: user,
        nama: req.user.nama
       })
    })
    .catch(err => console.error(err))
}

exports.updateuser = (req, res) => {
  // Update data here
  user.update({
    role: req.body.role,
    nama: req.body.nama,
    email : req.body.email,
    alamat : req.body.alamat,
    no_telepon : req.body.no_telepon
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(() => {
      res.redirect('/index/user')
    })
    .catch(err => console.error(err))
}

exports.removeuser = (req, res) => {
  user.findOne({where: {
    id: parseInt(req.params.id)
  }})
    .then(user => {
      user.destroy()
      res.redirect('/index/user')
    })
    .catch(err => console.error(err))
}

exports.detailprofil = (req,res)=>{
  res.render('profil', { 
    user: req.user,
    foto: req.user.avatar,
    nama: req.user.firstname
   })
}

exports.ubahprofil = (req,res)=>{
  res.render('profil', { 
    user: req.user,
    foto: req.user.avatar,
    nama: req.user.firstname
   })
}

exports.saveprofil = (req,res)=>{
  user.update({
    image: req.body.image,
    nama: req.body.nama,
    jumlah: req.body.jumlah,
    deskripsi: req.body.deskripsi, 
    status: req.body.status,
    kategori: req.body.kategori
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(() => {
      res.redirect('/index/barang')
    })
    .catch(err => console.error(err))
}
