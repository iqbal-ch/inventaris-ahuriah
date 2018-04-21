module.exports = function(sequelize, Sequelize) {
    
       var Log = sequelize.define('log', {
    
           id: {
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER
           },
    
           id_user:{
               type: Sequelize.INTEGER,
               notEmpty: true
           },
    
           id_barang: {
               type: Sequelize.INTEGER,
               notEmpty: true
           },

           id_jenis_barang:{
                type:Sequelize.INTEGER,
                notEmpty: true
           },
    
           id_transaksi: {
               type: Sequelize.INTEGER
           },

           jumlah:{
                type: Sequelize.INTEGER
           },

           role: {
               type: Sequelize.ENUM('update barang', 'insert barang','delete barang','peminjaman','pengembalian','insert jenis barang','update jenis barang','delete jenis barang')
           }
           
       });
    
       return Log;
   }