var exports = module.exports = {}
const multer = require('multer');
const path = require('path');
const barang = require('../models').barang
const log = require('../models').log
const jenisbarang = require('../models').jenis_barang

jenisbarang.hasMany(barang, {foreignKey: 'id_jenis_barang'})
barang.belongsTo(jenisbarang, {foreignKey: 'id_jenis_barang'})

const storage = multer.diskStorage({
  destination: './app/public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

//punya admin buat jenis barang
exports.indexjenisbarang = (req, res) => {
  jenisbarang.findAll()
    .then(jenisbarang => {
      res.render('index-jenisbarang', { 
        jenisbarangs: jenisbarang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
}

exports.detailjenisbarang = (req, res) => {
  jenisbarang.findOne({where: { id: parseInt(req.params.id) }})
    .then(jenisbarang => {
      res.render('detail-jenisbarang', { 
        jenisbarang: jenisbarang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
    .catch(err => console.error(err))
}

exports.tamabahjenisbarang = (req, res) => {
  res.render('tambah-jenisbarang',{
    nama: req.user.nama,
    role: req.user.role,
    id_user: req.user.id
  })
}

exports.simpanjenisbarang = (req, res) => {
  upload(req,res,(err) => {
    if(err){
      res.redirect('/tambah/jenis-barang')
      console.log(err)
    }else{
      if(req.file == undefined){
        res.redirect('/tambah/jenis-barang')
        console.log(err)
      }else{
        req.body.image = req.file.filename
        jenisbarang.create(req.body)
        .then((jenisbarang) => {
          res.redirect(`/detail/jenis-barang/${jenisbarang.id}`)
        })
        .catch(err => console.error(err))
      }
    }
  })
}

exports.ubahjenisbarang = (req, res) => {
  jenisbarang.findOne({ where: { id: parseInt(req.params.id) } })
    .then((jenisbarang) => {
      res.render('ubah-jenisbarang', { 
        jenisbarang: jenisbarang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
      })
    })
    .catch(err => console.error(err))
}

exports.updatejenisbarang = (req, res) => {
  // Update data here
  jenisbarang.update({
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
      res.redirect('/index/jenis-barang')
    })
    .catch(err => console.error(err))
}

exports.removejenisbarang = (req, res) => {
  jenisbarang.findOne({where: {
    id: parseInt(req.params.id)
  }})
    .then(jenisbarang => {
      // var log ={
      //   body :{
      //     id_user: req.user.id,
      //     id_barang: barang.id,
      //     jumlah:null,
      //     role:'delete'
      //   }
      // }
      // log.create(log.body)
      jenisbarang.destroy()
      res.redirect('/index/jenis-barang')
    })
    .catch(err => console.error(err))
}


//punya admin buat barang
exports.indexbarang = (req, res) => {
  
  barang.findAll({
    include: [{
    model: jenisbarang
  }]
  })
    .then(barang => {
      res.render('index-barang', { 
        barangs: barang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
}

exports.barangrusak = (req, res) => {
  
  barang.findAll({
    include: [{
    model: jenisbarang
  }], where: {
    kondisi: 'rusak'
  }
  })
    .then(barang => {
      res.render('index-rusak', { 
        barangs: barang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
}

exports.detailbarang = (req, res) => {
  barang.findOne({
    where: { id: parseInt(req.params.id) },
    include: [{model: jenisbarang }],
    

  })
    .then(barang => {
      console.log(barang)
      res.render('detail-barang', { 
        barang: barang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
    .catch(err => console.error(err))
}

exports.tambahbarang = (req, res) => {
  jenisbarang.findAll()
  .then(jenisbarang => {
    res.render('tambah-barang',{
      jenisbarangs: jenisbarang,
      nama: req.user.nama,
      role: req.user.role,
      id_user: req.user.id
    })
  })
  
} 

exports.simpanbarang = (req, res) => {
    var idjenis = req.body.jenis
    barang.create({
      id_jenis_barang: req.body.jenis
    })
    .then((barang) => {
      var tran ={
        body :{
          id_user: req.user.id,
          id_barang: barang.id,
          id_jenis_barang: barang.id_jenis_barang,
          jumlah: 1,
          role:'insert barang'
        }
      }
      log.create(tran.body)
          res.redirect(`/detail/barang/${barang.id}`)
        })
    .catch(err => console.error(err))

    jenisbarang.findOne({where: { id: idjenis }})
    .then((jenisbarang) => {
      var total = jenisbarang.jumlah + 1
      console.log(total)
      jenisbarang.update({
      jumlah: total,
      status: 'ada'
      },{
        where:{
          id:jenisbarang.id
        }
      })
    })
    .catch(err => console.error(err))
      
}

exports.ubahbarang = (req, res) => {
  barang.findOne({ where: { id: parseInt(req.params.id) } })
    .then((barang) => {
      res.render('ubah-barang', { 
        barang: barang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
      })
    })
    .catch(err => console.error(err))
}

exports.updatebarang = (req, res) => {
  // Update data here
  barang.update({
    kondisi: req.body.kondisi,
    status: req.body.status
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(() => {
      var tran ={
        body :{
          id_user: req.user.id,
          id_barang: barang.id,
          id_jenis_barang: barang.id_jenis_barang,
          jumlah: 1,
          role:'update barang'
        }
      }
      log.create(tran.body)
      res.redirect('/index/barang')
    })
    .catch(err => console.error(err))
}

exports.removebarang = (req, res) => {
  barang.findOne({where: {
    id: parseInt(req.params.id)
  }})
    .then(barang => {

      var tran ={
        body :{
          id_user: req.user.id,
          id_barang: barang.id,
          id_jenis_barang: barang.id_jenis_barang,
          jumlah: 1,
          role:'delete barang'
        }
      }

      log.create(tran.body)

      jenisbarang.findOne({where: { id: barang.id_jenis_barang }})
      .then((jenisbarang) => {
          var total = jenisbarang.jumlah - 1
          if(total == 0){
            var temp = 'kosong'
          }
          jenisbarang.update({
          jumlah: total,
          status: temp
          },{
            where:{
              id:jenisbarang.id
            }
          })
        })
    .catch(err => console.error(err))
    
    barang.destroy()
    res.redirect('/index/barang')
    })
    .catch(err => console.error(err))
}


//punya basic
exports.daftarbarang = (req, res) => {
  barang.findAll({
    include: [{
      model: jenisbarang
    }]
  })
    .then(barang => {
      jenisbarang.findAll()
      .then(jenisbarang => {
        res.render('daftar-barang', { 
          jenisbarangs:jenisbarang,
          barangs: barang,
          layout:false,
          //nama: req.user.nama
         })
      })
  })
}


exports.editbarang = (req, res) => {
  barang.findOne({ where: { id: parseInt(req.params.id) } })
    .then((barang) => {
      res.render('edit-barang', {
        layout:false, 
        barang: barang,
        nama: req.user.nama
      })
    })
    .catch(err => console.error(err))
}

exports.lihatbarang = (req, res) => {
  barang.findOne({
    where: { id: parseInt(req.params.id) },
    include: [{model: jenisbarang }],
  })
    .then(barang => {
      console.log(barang)
      res.render('lihat-barang', { 
        layout: false,
        barang: barang,
        nama: req.user.nama,
        role: req.user.role,
        id_user: req.user.id
       })
    })
    .catch(err => console.error(err))
}
