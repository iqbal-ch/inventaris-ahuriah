module.exports = function(sequelize, Sequelize) {
    
       var Transaksi = sequelize.define('transaksi', {
    
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
           
           no_identitas_peminjam: {
            type: Sequelize.STRING,
            notEmpty: true
           },

           nama_peminjam: {
            type: Sequelize.STRING,
            notEmpty: true
           },

          alamat_peminjam: {
            type: Sequelize.TEXT,
            notEmpty: true
          },

          untuk_keperluan: {
            type: Sequelize.TEXT,
            notEmpty: true
            },
            
           tanggal_pengemballian: {
            type: Sequelize.DATEONLY
           },

           role: {
               type: Sequelize.ENUM('dipinjamkan', 'dikembalikan'),
               defaultValue: 'dipinjamkan'
           }
       }, {
            classMethods: {
                associate: function(models) {
                    Transaksi.hasOne(models.Transaksi,{
                        foreignKey: 'id_transaksi',
                        onDelete: 'CASCADE'
                    });
                    Transaksi.belongTO(models.User,{
                        foreignKey:'id_user',
                        onDelete:'CASCADE'
                    });
                    Transaksi.belongTO(models.Barang,{
                        foreignKey:'id_barang',
                        onDelete:'CASCADE'
                    });
                }
            }
       });
    
       return Transaksi;
   }