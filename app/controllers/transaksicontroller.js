var exports = module.exports = {}
const transaksi = require('../models').transaksi
const barang = require('../models').barang
const jenisbarang = require('../models').jenis_barang

barang.hasMany(transaksi, {foreignKey: 'id_barang'})
transaksi.belongsTo(barang, {foreignKey: 'id_barang'})

jenisbarang.hasMany(barang, {foreignKey: 'id_jenis_barang'})
barang.belongsTo(jenisbarang, {foreignKey: 'id_jenis_barang'})


exports.indextransaksi = (req, res) => {
  transaksi.findAll()
  .then(transaksi => {
    res.render('index-transaksi', { 
      transaksis: transaksi,
      nama: req.user.nama,
      role: req.user.role
     })
  })
}

exports.tambahtransaksi = (req, res) => {
  barang.findAll({
    include: [{
      model: jenisbarang
    }],
    where: {
      status: 'ada'
    }
  }).then(barang => {
    console.log(barang)
    res.render('tambah-peminjaman',{
      barangs: barang,
      nama: req.user.nama,
      role: req.user.role
    })
  })
}

exports.simpantransaksi= (req, res) => {
  var tran ={
    body :{
      id_user: req.user.id,
      id_barang: req.body.id_barang,
      nama_peminjam: req.body.nama_peminjam,
      no_identitas_peminjam: req.body.no_identitas_peminjam,
      alamat_peminjam: req.body.alamat_peminjam,
      untuk_keperluan: req.body.untuk_keperluan

    }
  }
  transaksi.create(tran.body)
  .then((transaksi) => {
    res.redirect(`/index/transaksi`)
  })
  .catch(err => console.error(err))
}

exports.detailtransaksi = (req, res) => {
  transaksi.findOne({
    include: [{model: barang}],
    where: { id: parseInt(req.params.id) }
  })
    .then(transaksi => {
      console.log(transaksi)
      res.render('detail-transaksi', { 
        transaksi: transaksi,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
    .catch(err => console.error(err))
}

exports.kembalikan= (req, res) => {
  transaksi.update({
    role:'dikembalikan'
  },{
    where:{
      id: parseInt(req.params.id)
    }
  })
  barang.update({
    status: 'ada'
  }, {
    where: {
      id: parseInt(req.params.id)
    }
  })
    .then(() => {
      res.redirect('/index/transaksi')
    })
    .catch(err => console.error(err))
}