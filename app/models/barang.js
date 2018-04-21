module.exports = function(sequelize, Sequelize) {
 
    var Barang = sequelize.define('barang', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        
        id_jenis_barang: {
            type: Sequelize.INTEGER
        },

        status: {
            type: Sequelize.ENUM('ada', 'tidak ada'),
            defaultValue: 'ada'
        },

        kondisi:{
            type: Sequelize.ENUM('baik','kurang baik','rusak'),
            defaultValue: 'baik'
        }
 
    }, {
        classMethods: {
            associate: function(models) {
                // Barang.hasMany(models.Barang,{
                //     foreignKey: 'id_barang',
                //     onDelete: 'CASCADE'
                // });
                Barang.belongsTo(models.Jenisbarang,{
                    foreignKey:'id_jenis_barang',
                    onDelete:'CASCADE'
                });
            }
        }
    });
    return Barang;
}