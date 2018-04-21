var exports = module.exports = {}
const log = require('../models').log

exports.indexlog = (req, res) => {
  log.findAll()
  .then(log => {
    res.render('index-log', { 
      logs: log,
      nama: req.user.nama,
      role: req.user.role
     })
  })
}
