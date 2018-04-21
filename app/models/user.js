module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        nama: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        alamat: {
            type: Sequelize.TEXT
        },

        no_telepon:{
            type: Sequelize.STRING
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        role: {
            type: Sequelize.ENUM('basic', 'admin'),
            defaultValue: 'basic'
        }
 
 
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.User,{
                    foreignKey: 'id_user',
                    onDelete: 'CASCADE'
                });
            }
        }
    });
 
    return User;
 
}