module.exports = function(sequelize, Sequelize) {
 
    var Jenisbarang = sequelize.define('jenis_barang', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        image: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        nama: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        jumlah: {
            type: Sequelize.INTEGER
        },

        deskripsi: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        
        status: {
            type: Sequelize.ENUM('ada', 'kosong'),
            defaultValue: 'kosong'
        },

        kategori: {
            type: Sequelize.STRING,
        }
 
    }, {
        classMethods: {
            associate: function(models) {
                Jenisbarang.hasMany(models.Barang,{
                    foreignKey: 'id_jenis_barang',
                    onDelete: 'CASCADE'
                });
            }
        }
    });
    return Jenisbarang;
}